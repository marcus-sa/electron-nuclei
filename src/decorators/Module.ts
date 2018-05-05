import { validateMetadata, defineNucleiMetadata } from './utils'
import { moduleMetadataKeys } from '../constants'
import { NucleiClassDecorator, ModuleMetadata } from '../types'

export function Module(metadata: ModuleMetadata): NucleiClassDecorator {
  validateMetadata<ModuleMetadata>(metadata, moduleMetadataKeys, Module.name)

  return (module, key) => {
    defineNucleiMetadata<ModuleMetadata>(metadata, module)
  }
}
