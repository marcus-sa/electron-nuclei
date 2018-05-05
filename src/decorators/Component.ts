import { validateMetadata, defineNucleiMetadata } from './utils'

import { PARAMTYPES_METADATA } from '../constants'
import { NucleiClassDecorator } from '../interfaces'

const metadataKeys = ["lol"];

export function Component(metadata?: object): NucleiClassDecorator {
  validateMetadata<any>(metadata, metadataKeys, Component.name)

  return (target, key) => {
    defineNucleiMetadata<any>(metadata, target)
  }
}
