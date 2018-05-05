import { validateMetadata, defineNucleiMetadata } from './utils'
import { PARAMTYPES_METADATA, componentMetadataKeys } from '../constants'
import { NucleiClassDecorator, ComponentMetadata } from '../types'

export function Component(metadata?: ComponentMetadata): NucleiClassDecorator {
  validateMetadata<ComponentMetadata>(metadata, componentMetadataKeys, Component.name)

  return (module, key) => {
    defineNucleiMetadata<ComponentMetadata>(metadata, module)
  }
}
