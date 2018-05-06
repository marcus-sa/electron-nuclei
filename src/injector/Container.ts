import { PARAMTYPES_METADATA, SINGLE_SCOPE_METADATA } from '../constants'

import { NucleiType, NucleiClassDecorator } from '../interfaces'

export type NucleiModule = NucleiType | NucleiClassDecorator

export class Container {

  private readonly store = new Map<string, NucleiType>()

  public getDependencies(module: NucleiModule) {
    return Reflect.getMetadata(PARAMTYPES_METADATA, module)
  }

  public bind(module: NucleiModule) {
    const dependencies = this.getDependencies(module)
    const instance = this.injectDependencies(module, dependencies)

    this.store.set(module.name, instance)

    return instance
  }

  public get(module: NucleiModule) {
    const singleScope = Reflect.hasMetadata(SINGLE_SCOPE_METADATA, module)

    if (singleScope || !this.store.has(module.name)) {
      return this.bind(module)
    }
    
    return this.store.get(module.name)
  }

  private injectDependencies(module, dependencies: NucleiModule[] = []) {
    const resolved = dependencies.map(dependency => {
      return this.get(dependency)/*this.store.has(dependency.name)
        ? this.get(dependency)
        : this.set(dependency) */
    })

    return new module(...resolved)
  }

}
