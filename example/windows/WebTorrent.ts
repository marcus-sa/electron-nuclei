import { Window, CrashReporter } from '../../src'

@Window({
  // Nuclei window metadata
  toggleDevtools: true,

  // Electron browser window options
  backgroundColor: '#1E1E1E',
  center: true,
  fullscreen: false,
  fullscreenable: false,
  height: 150,
  maximizable: false,
  minimizable: false,
  resizable: false,
  show: true,
  skipTaskbar: true,
  title: 'webtorrent-hidden-window',
  useContentSize: true,
  width: 150,
})
export class WebTorrent {

  //public constructor(private readonly crashReporter: CrashReporter) {}

}
