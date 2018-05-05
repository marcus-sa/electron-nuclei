import { Module } from "../src";

//import { AutoUpdater } from '../src/components/AutoUpdater'
import { Service, Logger } from './components'
import { WebTorrent } from './windows'

@Module({
  windows: [
    WebTorrent
  ],
  /*components: [
    //AutoUpdater, 
    Service, 
    Logger
  ]*/
})
export class AppModule {}
