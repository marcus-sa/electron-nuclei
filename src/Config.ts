import * as path from 'path'
import * as fs from 'fs'
import { arch } from 'arch'
import { get } from 'lodash.get'
import { set } from 'lodash.set'
import * as electron from 'electron'

import { AppOptions } from './types'
import { Component } from './decorators'

export type IConfig = {
  osArch: string,
  app: {
    name: string,
    crashReporter: string,
    description: string
    dev: boolean,
    //portable: boolean
  },
  path: {
    config: string,
    portable: string
  }
} | object

/*function isPortable() {
  if (IS_DEV) return true
  // Fast path: Non-Windows platforms should not check for path on disk
  if (process.platform !== 'win32' || !IS_PRODUCTION) {
    return false
  }

  try {
    // This line throws if the "packageName" folder does not exist, and does
    // nothing otherwise.
    fs.accessSync(PORTABLE_PATH, fs.constants.R_OK | fs.constants.W_OK)
    return true
  } catch (err) {
    return false
  }
}*/

@Component()
export class Config {

  public packageName: string = ''

  public tempPath = process.platform === 'win32'
    ? 'C:\\Windows\\Temp'
    : '/tmp'

  private _config: IConfig = {}

  public isProduction(): boolean | undefined {
    // Node.js process
    if (!process.versions.electron) return false
    if (process.platform === 'darwin') return !/\/Electron\.app\//.test(process.execPath)
    if (process.platform === 'win32') return !/\\electron\.exe$/.test(process.execPath)
    if (process.platform === 'linux') return !/\/electron$/.test(process.execPath)
  }
  
  private getPortablePath(portable: string | boolean) {
    if (typeof portable === 'boolean') {
      return portable
        ? path.join(this.tempPath, this.packageName)
        : path.join(path.dirname(process.execPath), 'Portable Settings') 
    } else if (typeof portable === 'string') {
      return portable
    }
  }

  public getPath(...paths: any[]) {
    const realPath = path.join(...paths)
  
    if (!process.versions.electron) {
      // Node.js process
      return realPath
    } else if (process.type === 'renderer') {
      // Electron renderer process
      return electron.remote.app.getPath(realPath)
    } else {
      // Electron main process
      return electron.app.getPath(realPath)
    }
  }

  public create(appOptions: AppOptions) {
    const pckg = require(path.join(appOptions.processPath, 'package.json'))

    this.packageName = appOptions.name || pckg.productName || pckg.name

    const appConfig = require('application-config')(this.packageName)
    const portablePath = this.getPortablePath(appOptions.portable)
  
    const configPath = appOptions.portable
      ? portablePath
      : path.dirname(appConfig.filePath)
  
    this._config = {
      osArch: arch() === 'x64' ? 'x64' : 'ia32',
      app: {
        name: this.packageName,
        description: pckg.description,
        dev: appOptions.development || !this.isProduction(),
        crashReporter: appOptions.crashReporter,
        //portable: !!appOptions.portable
      },
      path: {
        config: configPath,
        portable: portablePath
      }
    }
  }

  public get(path: string): IConfig {
    return get(this._config, path)
  }

  public set(path: string, value: string): any {
    return set(this._config, path, value)
  }

}