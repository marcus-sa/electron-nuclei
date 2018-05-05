import { validateMetadata, defineNucleiMetadata } from './utils'
import { metadata, PARAMTYPES_METADATA, SELF_DECLARED_DEPS_METADATA } from '../constants'
import { NucleiClassDecorator } from '../interfaces'

export const metadataKeys = [
  metadata.WINDOWS,
  metadata.COMPONENTS
]

export function Module(metadata: any): NucleiClassDecorator {
  validateMetadata<any>(metadata, metadataKeys, Module.name)

  return (target, key) => {
    defineNucleiMetadata<any>(metadata, target)
  }
}
