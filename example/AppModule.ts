import { Module } from '../src'

//import { AutoUpdater } from '../src/components/AutoUpdater'
import { Service } from './components/Service'
import { Logger } from './components/Logger'
import { WebTorrent } from './windows'
//import { CrashReporter } from '@nuclei/CrashReporter'

const connectionFactory = {
  provide: 'ConnectionToken',
  useFactory: (logger: Logger) => {
    logger.log('wazzup')

    return Math.random()
  },
  inject: [Logger]
}

@Module({
  windows: [
    WebTorrent
  ],
  /*components: [
    CrashReporter.module('some url to report to'),
    AutoUpdater.forRoot({

    })
  ]*/
  components: [
    connectionFactory,
    Logger,
    Service,
  ]
} as any)
export class AppModule {}
