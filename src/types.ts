import { BrowserWindowConstructorOptions } from 'electron'

import { Window, Component } from './decorators'
import {ContainerModule} from "./injector/types";

export interface NucleiType {
  new(...args: any[]): any
}

export type NucleiClassDecorator = (target: NucleiType, key?: string | Symbol, descriptor?: PropertyDescriptor) => any

export type NucleiModule = NucleiType | NucleiClassDecorator

export type WindowMetadata = {
  //devTools?: boolean
  toggleDevtools?: boolean
  tempate?: string
} & BrowserWindowConstructorOptions | undefined

export type ComponentMetadata = {
  lol?: string
} | undefined

export type AppOptions = {
  processPath?: string
  crashReporter?: string
  development?: boolean
  portable?: string | boolean
}// | object

export interface ModuleMetadata {
  windows?: (typeof Window | NucleiModule)[]
  components?: (typeof Component | ContainerModule)[]
}

export type Token = any//NucleiModule | string | ForwardRef