import { app, BrowserWindow } from 'electron'
import * as pick from 'lodash.pick'
import * as omit from 'lodash.omit'
import * as path from 'path'

import { windowMetadataKeys, browserWindowOptions } from './constants'
import { NucleiModule, NucleiClassDecorator, ModuleMetadata } from './types'
import { Config } from './Config'
import { WindowEvents, AppEvents } from './events'
import { Container } from './injector/Container'
import { getNucleiMetadata } from './decorators/utils'
import { CrashReporter } from './CrashReporter'

export class Application {

  private shouldQuit: boolean = false

  constructor(
    private readonly metadata: ModuleMetadata, 
    private readonly container: Container
  ) {}

  public preventMultipleInstances(cb?: any) {
    if (cb && !(cb instanceof Function)) { 
      throw new Error('preventMultipleInstances')
    }

    this.shouldQuit = app.makeSingleInstance(cb)

    if (this.shouldQuit) {
      // app.quit doesn't quite work on windows
      return process.platform === 'win32'
        ? app.exit()
        : app.quit()
    }
  }

  public async start() {
    if (!this.shouldQuit) {
      //const config = this.container.get(Config)

      /*if (config.IS_PORTABLE) {
        const path = require('path')
        // Put all user data into the "Portable Settings" folder
        app.setPath('userData', config.CONFIG_PATH)
        // Put Electron crash files, etc. into the "Portable Settings\Temp" folder
        app.setPath('temp', path.join(config.CONFIG_PATH, 'Temp'))
      }*/

      /*if (config.get('app.crashReporter')) {
        this.container.get(CrashReporter).start()
        // Create crash reporter here
      }*/


      // @TODO: How should windows be initiated?
      app.on(AppEvents.READY, () => {
        (this.metadata.windows || []).forEach((window: any) => { 
          const WindowInstance = this.container.get(window)
          const windowOptions = getNucleiMetadata(window, windowMetadataKeys)
  
          const browserWindow = new BrowserWindow(
            pick(windowOptions, browserWindowOptions)
          )
  
          WindowInstance.browserWindow = browserWindow
  
          const { template, toggleDevtools } = omit(windowOptions, browserWindowOptions)
  
          if (template) browserWindow.loadURL(template)
  
          WindowInstance.toggleDevtools = function () {
            this.browserWindow.once(WindowEvents.READY, () => {
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
      })
    }
  }

}