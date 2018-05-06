import { NucleiType } from '../interfaces'

export const validateMetadata = <MD>(metadata: MD, metadataKeys: string[], name: string) => {
  Object.keys(metadata || {}).forEach(key => {
    if (metadataKeys.includes(key)) return

    throw new Error(`Invalid property '${key}' in @${name}() decorator.`)
  })
}

export const defineNucleiMetadata = <MD>(metadata: MD, target: NucleiType) => {
  Object.keys(metadata || {}).forEach(property => {
    Reflect.defineMetadata(property, metadata[property], target)
  })
}

export const getNucleiMetadata = <T>(target: NucleiType, metadataKeys: string[]) => {
  const metadata = Reflect.getMetadataKeys(target)
    .reduce((metadata: object, key: string) => {
      metadata[key] = Reflect.getMetadata(key, target)

      return metadata
    }, {} as any)

  validateMetadata(metadata, metadataKeys, target.name)
  
  return metadata
  /*return metadataKeys.reduce(() => {
    Reflect.getMetadata
  }, {} as any)*/
}
