import { PARAMTYPES_METADATA } from './constants'
import { Container } from './injector/Container'
import { Module } from "./decorators";

import { NucleiType } from './interfaces/NucleiType'

export class Factory {

  public static container = new Container()

  public static async create(module: NucleiType) {
    const metadata = Reflect.getMetadataKeys(module)
      .reduce((opts: object, key: string) => {
        opts[key] = Reflect.getMetadata(key, module)

        return opts
      }, {})

    Object.keys(metadata).forEach(key => {
      metadata[key].forEach(module => {
        Factory.container.set(module)
      })
    }) 
  }
}
