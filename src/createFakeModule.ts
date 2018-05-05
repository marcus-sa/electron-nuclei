import { NucleiType } from './types'
import { SINGLE_SCOPE_METADATA } from './constants'

export function defineRandomName(module: NucleiType) {
  Object.defineProperty(module, 'name', {
    value: Math.random().toString(36).substring(7),
    writable: false
  })

  return module
}

export function createSingletonModule(module: Function): NucleiType {
  return defineRandomName(class {
    constructor() {
      return module()
    }
  })
}

export function createSingleScopeModule(module: Function): NucleiType {
  //return (...args: any[]): NucleiType => {
    const singleton = createSingletonModule(module)
    
    Reflect.defineMetadata(SINGLE_SCOPE_METADATA, true, singleton)
  
    return singleton
  //}
}