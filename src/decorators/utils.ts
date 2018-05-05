export const validateMetadata = <MD>(metadata: MD, metadataKeys: string[], name: string) => {
  Object.keys(metadata || {}).forEach(key => {
    if (metadataKeys.includes(key)) return;

    throw new Error(`Invalid property '${key}' in @${name}() decorator.`)
  })
}

export const defineNucleiMetadata = <MD>(metadata: MD, target: object) => {
  Object.keys(metadata || {}).forEach(property => {
    Reflect.defineMetadata(property, metadata[property], target)
  })
}
