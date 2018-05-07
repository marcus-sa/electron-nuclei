import { Module } from '../src'

//import { AutoUpdater } from '../src/components/AutoUpdater'
import { Service, Logger } from './components'
import { WebTorrent } from './windows'
import { CrashReporter } from '@nuclei/CrashReporter'

@Module({
  windows: [
    WebTorrent
  ],
  components: [
    CrashReporter.module('some url to report to'),
    AutoUpdater.forRoot({

    })
  ]
  /*components: [
    //AutoUpdater, 
    Service, 
    Logger
  ]*/
})
export class AppModule {}
