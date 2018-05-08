import { validateMetadata, defineNucleiMetadata } from './utils'
import { componentMetadataKeys } from '../constants'
import { NucleiClassDecorator, ComponentMetadata } from '../types'

export function Component(metadata?: ComponentMetadata): NucleiClassDecorator {
  validateMetadata<ComponentMetadata>(metadata, componentMetadataKeys, Component.name)

  return (module) => {
    defineNucleiMetadata<ComponentMetadata>(metadata, module)
  }
}
