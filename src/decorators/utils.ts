import { NucleiType } from '../types'

export const validateMetadata = <MD>(metadata: MD, metadataKeys: string[], name: string) => {
  Object.keys(metadata || {}).forEach(key => {
    if (metadataKeys.includes(key)) return

    throw new Error(`Invalid property '${key}' in @${name}() decorator.`)
  })
}

export const defineNucleiMetadata = <MD>(metadata: MD, module: NucleiType) => {
  Object.keys(metadata || {}).forEach(property => {
    Reflect.defineMetadata(property, metadata[property], module)
  })
}

export const getNucleiMetadata = <T>(module: NucleiType, metadataKeys: string[]) => {
  return Reflect.getMetadataKeys(module)//metadataKeys
    .reduce((metadata: object, key: string) => ({
      ...metadata,
      [key]: Reflect.getMetadata(key, module)
    }), {})

  // No reason to revalidate metadata as it 
  // has already been done before decorators have reflected 
  //validateMetadata(metadata, metadataKeys, module.name)
}
