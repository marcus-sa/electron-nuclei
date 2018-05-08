import { PARAMTYPES_METADATA, SINGLE_SCOPE_METADATA, SELF_DECLARED_DEPS_METADATA, COMPONENT_METADATA } from '../constants'

import { NucleiModule, NucleiType, Token } from '../types'
import {BoundContainerModule, CLASS, ContainerModule, FACTORY} from "./types";

export class Container {

  private readonly store = new Map<Symbol, NucleiType>()

  public static getModuleName(module: Token): Symbol {
  	return typeof module !== 'string'
				? module.name || module.constructor.name
				: module
  }

  private getDependencies(module: NucleiModule) {
    return Reflect.getMetadata(PARAMTYPES_METADATA, module)
  }

  private getModuleType(module: /*ContainerModule*/ any) {
  	if (module.provide && module.useFactory) return FACTORY
		if (module.provide && module.useClass) return CLASS

		return COMPONENT_METADATA
	}

	private createFactory({ provide, useFactory, inject = [] }) {
		return {
			name: provide,
			module: useFactory(...inject.map(
				dependency => this.get(dependency)
			))
		}
	}

	/*private createClass({ provide, useClass, inject }: ContainerModule) {

	}*/

	private createComponent(module: NucleiModule) {
		const dependencies = this.getDependencies(module)

		return {
			module: this.injectComponentDependencies(module, dependencies),
			name: Container.getModuleName(module)
		}
	}

	private createModule(type, module): BoundContainerModule {
  	switch (type) {
			case FACTORY:
				return this.createFactory(module)

			/*case CLASS:
				return this.createClass(module)*/

			default:
				return this.createComponent(module)
		}
	}

  public bind<T>(module: ContainerModule/*, overwrite: boolean = true*/): T {
  	const type = this.getModuleType(module)

		const { name, module: instance } = this.createModule(type, module)

    /*if (!overwrite && this.store.has(moduleName)) {
      console.error(`[${moduleName}]: no rebind to container.`)
      return this.store.get(moduleName)//
    }*/

    console.log(Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, module))

    this.store.set(name, instance)

    console.info(`[${name}]: has been bound to container.`)

    return instance
  }

  public get<T extends NucleiType>(module: Token & NucleiModule) { //: T
		const moduleName = Container.getModuleName(module)
    const singleScope = Reflect.hasMetadata(SINGLE_SCOPE_METADATA, module)

    if (singleScope || !this.store.has(moduleName)) {
      return this.bind(module)
    }
    
    return this.store.get(moduleName)
  }

  private injectComponentDependencies(module, dependencies?: NucleiModule[]) {
    //console.log(module, dependencies)
    const resolved = (dependencies || []).map(
      dependency => typeof dependency === 'function' && this.get(dependency)
    )

    return new module(...resolved)
  }

}
