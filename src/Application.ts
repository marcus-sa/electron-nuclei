import { app, BrowserWindow } from 'electron'
import { pick } from 'lodash.pick'
import { omit } from 'lodash.omit'
import * as path from 'path'

import { Container, NucleiModule } from './injector/Container'
import { ModuleMetadata, NucleiClassDecorator } from './interfaces'
import { getNucleiMetadata } from './decorators/utils'
import { windowMetadataKeys, browserWindowOptions, WindowEvents } from './constants'

export class Application {

  private shouldQuit: boolean = false

  public constructor(
    private readonly metadata: ModuleMetadata, 
    private readonly container: Container
  ) {}

  public preventMultipleInstances(cb?: any) {
    if (cb && !(cb instanceof Function)) { 
      throw new Error('preventMultipleInstances')
    }

    this.shouldQuit = app.makeSingleInstance(cb)

    if (this.shouldQuit) app.quit()
  }

  public async start() {
    if (!this.shouldQuit) {
      /*if (config.IS_PORTABLE) {
        const path = require('path')
        // Put all user data into the "Portable Settings" folder
        app.setPath('userData', config.CONFIG_PATH)
        // Put Electron crash files, etc. into the "Portable Settings\Temp" folder
        app.setPath('temp', path.join(config.CONFIG_PATH, 'Temp'))
      }*/


      // @TODO: How should windows be initiated?
      this.metadata.windows.forEach((window: any) => { 
        const WindowInstance = this.container.get(window)
        const windowOptions = getNucleiMetadata(window, windowMetadataKeys)

        const browserWindow = new BrowserWindow(
          pick(windowOptions, browserWindowOptions)
        )

        WindowInstance.browserWindow = browserWindow

        const { template, toggleDevtools } = omit(windowOptions, browserWindowOptions)

        if (template) browserWindow.loadURL(template)

        WindowInstance.toggleDevtools = function () {
          this.browserWindow.once(WindowEvents.READY_TO_SHOW, () => {
            if (this.browserWindow.webContents.isDevToolsOpened()) {
              this.browserWindow.webContents.closeDevTools()
              this.browserWindow.hide()
            } else {
              this.browserWindow.webContents.openDevTools(/*{ detach: true }*/)
            }
          })
        }

        if (toggleDevtools) WindowInstance.toggleDevtools()

        /*const BaseWindow = class extends WindowInstance {

        }*/
      })
    }
  }

}