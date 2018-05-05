import { validateMetadata, defineNucleiMetadata } from './utils'
import { NucleiClassDecorator, WindowMetadata } from '../types'
import { windowMetadataKeys } from '../constants'

export function Window(metadata?: WindowMetadata): NucleiClassDecorator {
  validateMetadata<WindowMetadata>(metadata, windowMetadataKeys, Window.name)

  return (module) => {
    console.log(module)
    defineNucleiMetadata<WindowMetadata>(metadata, module)
  }
}
