import { app, AutoUpdater } from 'electron'

import { PARAMTYPES_METADATA, AppEvents } from './constants'
import { Container } from './injector/Container'
import { Module, Subscribe } from './decorators'

import { moduleMetadataKeys } from './constants'
import { NucleiType, ModuleMetadata } from './interfaces'
import { Application } from './Application'
import { getNucleiMetadata } from './decorators/utils'

export abstract class Factory {

  private static metadata: ModuleMetadata

  public static container = new Container()

  public static async create(module: NucleiType, options?: any) {
    this.metadata = getNucleiMetadata(module, moduleMetadataKeys)

    Object.keys(this.metadata).forEach(key => {
      this.metadata[key].forEach(module => {
        this.container.bind(module)
      })
    })

    return new Application(this.metadata, this.container)
  }

  /*@Subscribe(AppEvents.READY)
  private static createWindows() {
    Object.keys(this.metadata.windows).forEach((window: any) => {
      console.log(window)
      this.container.get(window.name)
    })
  }*/

}
