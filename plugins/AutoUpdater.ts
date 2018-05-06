import { autoUpdater } from 'electron' 
import * as axios from 'axios'
import { Factory, Component, Subscribe } from 'electron-nuclei'
import { NucleiType } from 'electron-nuclei/interfaces'
import { AppEvents } from 'electron-nuclei/constants'

const AUTO_UPDATE_URL = config.APP.URL +
  '/' + config.APP.VERSION +
  '/' + process.platform +
  '/' + config.OS_SYSARCH

export interface AutoUpdaterOptions {
  autoUpdateUrl: string
  window: NucleiType
}

@Component()
export class AutoUpdater {

  //constructor(private readonly opts: AutoUpdaterOptions) {}

  @Subscribe(AppEvents.READY)
  protected setup() {
    if (process.platform === 'linux') {
      this.initLinux()
    } else {
      this.initDarwinWin32()
    }
  }

  private initLinux() {
    axios.get(AUTO_UPDATE_URL)
      .then((res) => {
        Factory.container.get(this.opts.window)
          .dispatch('updateAvailable', res.data.version)
      })
      .catch(console.error)
  }

  private initDarwinWin32() {
    autoUpdater.on(
      'error', 
      (err) => console.error(`Update error: ${err.message}`)
    )

    autoUpdater.on(
      'checking-for-update',
      () => console.info('Checking for update')
    )

    autoUpdater.on(
      'update-available',
      () => console.info('Update available')
    )

    autoUpdater.on(
      'update-not-available',
      () => console.info('No update available')
    )

    autoUpdater.on(
      'update-downloaded',
      (e, notes, name, date, url) => console.info(`Update downloaded: ${name}: ${url}`)
    )

    autoUpdater.setFeedURL(AUTO_UPDATE_URL)
    autoUpdater.checkForUpdates()
  }

  onInit(app: Factory) {
    app.setUpdaterConfig = (opts: AutoUpdaterOptions) => {

    }
  }

}