import { BrowserWindowConstructorOptions } from 'electron'

export type WindowOptions = {
  //devTools?: boolean
  toggleDevtools?: boolean
  tempate?: string
} & BrowserWindowConstructorOptions | undefined

export type ComponentOptions = {
  lol?: string
} | undefined

export type ModuleOptions = {
  windows?: any 
  components?: any
}