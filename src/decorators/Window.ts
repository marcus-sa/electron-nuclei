import { validateMetadata, defineNucleiMetadata } from './utils'
import { NucleiClassDecorator } from '../interfaces'
import { windowMetadataKeys } from '../constants'
import { WindowOptions } from '../types'

export function Window(metadata?: WindowOptions): NucleiClassDecorator {
  validateMetadata<WindowOptions>(metadata, windowMetadataKeys, Window.name)

  return (target) => {
    defineNucleiMetadata<WindowOptions>(metadata, target)
  }
}
