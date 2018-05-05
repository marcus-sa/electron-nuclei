import { app } from 'electron'

import { AppEvents, WindowEvents } from '../events'
import { NucleiType } from '../types'
import { Factory } from '../Factory'

// @TODO: Event subscribe decorator depending on window or app eventemitter ?
export type GlobalEvents = AppEvents | WindowEvents

export function Subscribe(event: GlobalEvents): MethodDecorator {
  //if (!Object.values(AppEvents).includes(event)) throw new Error(`[${Subscribe.name}]: Event ${event} doesn't exist`)

  return (module: NucleiType | any, method) => {
    app.on(<any>event, (...args: any[]) => { 
      Factory.container.get(module)[method](...args)
    })
  }
}