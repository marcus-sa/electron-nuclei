import { PARAMTYPES_METADATA, SINGLE_SCOPE_METADATA } from '../constants'

import { NucleiType } from '../interfaces'

export class Container {
  private readonly store = new Map<string, any>()

  public getDependencies(module: NucleiType) {
    return Reflect.getMetadata(PARAMTYPES_METADATA, module)
  }

  public set(module: NucleiType) {
    const dependencies = this.getDependencies(module)
    const instance = this.injectDependencies(module, dependencies)

    this.store.set(module.name, instance)

    return instance
  }

  public get(module: NucleiType) {
    const singleScope = Reflect.hasMetadata(SINGLE_SCOPE_METADATA, module)

    if (singleScope || !this.store.has(module.name)) {
      return this.set(module)
    }
    
    return this.store.get(module.name)
  }

  private injectDependencies(module: NucleiType, dependencies: NucleiType[] = []) {
    const resolved = dependencies.map(dependency => {
      return this.store.has(dependency.name)
        ? this.get(dependency)
        : this.set(dependency)
    })

    return new module(...resolved)
  }
}
