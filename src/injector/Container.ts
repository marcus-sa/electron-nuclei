import { PARAMTYPES_METADATA, SINGLE_SCOPE_METADATA, SELF_DECLARED_DEPS_METADATA } from '../constants'

import { NucleiModule, NucleiClassDecorator, NucleiType } from '../types'

export class Container {

  private readonly store = new Map<string, NucleiType>()

  public getModuleName(module: NucleiModule): string {
    return module.name || module.constructor.name
  }

  public getDependencies(module: NucleiModule) {
    return Reflect.getMetadata(PARAMTYPES_METADATA, module)
  }

  public bind(module: NucleiModule) {
    const moduleName = this.getModuleName(module)

    const dependencies = this.getDependencies(module)
    console.log(moduleName, dependencies)
    const instance = this.injectDependencies(module, dependencies)

    this.store.set(moduleName, instance)

    console.log(`[${moduleName}]: has been bound to container.`)

    return instance
  }

  public get(module: NucleiModule) {
    const moduleName = this.getModuleName(module)
    const singleScope = Reflect.hasMetadata(SINGLE_SCOPE_METADATA, module)
    
    console.log(module, 'singleScope', singleScope)

    if (singleScope || !this.store.has(moduleName)) {
      return this.bind(module)
    }
    
    return this.store.get(moduleName)
  }

  private injectDependencies(module, dependencies: NucleiModule[] = []) {
    const resolved = dependencies.map(
      dependency => this.get(dependency)
    )

    //console.log(module, dependencies)

    return new module(...resolved)
  }

}
