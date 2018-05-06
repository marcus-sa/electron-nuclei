import { validateMetadata, defineNucleiMetadata } from './utils'
import { moduleMetadataKeys } from '../constants'
import { NucleiClassDecorator } from '../interfaces'
import { ModuleOptions } from '../types'

export function Module(metadata: ModuleOptions): NucleiClassDecorator {
  validateMetadata<ModuleOptions>(metadata, moduleMetadataKeys, Module.name)

  return (target, key) => {
    defineNucleiMetadata<ModuleOptions>(metadata, target)
  }
}
