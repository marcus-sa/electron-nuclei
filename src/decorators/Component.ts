import { validateMetadata, defineNucleiMetadata } from './utils'

import { PARAMTYPES_METADATA, componentMetadataKeys } from '../constants'
import { NucleiClassDecorator } from '../interfaces'
import { ComponentOptions } from '../types'

export function Component(metadata?: ComponentOptions): NucleiClassDecorator {
  validateMetadata<ComponentOptions>(metadata, componentMetadataKeys, Component.name)

  return (target, key) => {
    defineNucleiMetadata<ComponentOptions>(metadata, target)
  }
}
