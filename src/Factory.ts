import { app, AutoUpdater } from 'electron'

import { PARAMTYPES_METADATA, moduleMetadataKeys } from './constants'
import { Container } from './injector/Container'
import { Module, Subscribe } from './decorators'

import { AppOptions, ModuleMetadata, NucleiType } from './types'
import { Application } from './Application'
import { getNucleiMetadata } from './decorators/utils'
import { Config } from './Config'
//import { CrashReporter } from './CrashReporter'

export abstract class Factory {

  private static metadata: ModuleMetadata

  public static container = new Container()

  public static async create(module: NucleiType, options: AppOptions = {}) {
    this.metadata = getNucleiMetadata(module, moduleMetadataKeys)

    Object.keys(this.metadata).forEach(key => {
      this.metadata[key].forEach(module => {
        this.container.bind(module)
      })
    })

    // Bind and create application config
    this.container.bind(Config).create(options)

    // Bind crash reporter
    // Moved crash reporter to external plugin
    // this.container.bind(CrashReporter)

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
