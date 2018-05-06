import { app, App } from 'electron'

import { Factory } from '../Factory'
import { AppEvents, WindowEvents } from '../constants'
import { NucleiType } from '../interfaces'

// @TODO: Event subscribe decorator depending on window or app eventemitter ?
export type GlobalEvents = AppEvents | WindowEvents

export function Subscribe(event: GlobalEvents): MethodDecorator {
  if (!AppEvents[event]) throw new Error(`[${Subscribe.name}]: Event ${event} doesn't exist`)

  return (target: NucleiType | any, method) => {
    app.on(<any>event, (...args: any[]) => Factory.container.get(target)[method](...args))
  }
}