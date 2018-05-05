import { validateMetadata, defineNucleiMetadata } from './utils'
import { NucleiClassDecorator } from '../interfaces'

const metadataKeys = ["lol"]

export function Window(metadata?: object): NucleiClassDecorator {
  validateMetadata<any>(metadata, metadataKeys, Window.name)

  return (target) => {
    defineNucleiMetadata<any>(metadata, target)
  }
}
