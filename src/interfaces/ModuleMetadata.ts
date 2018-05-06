import { Window, Component } from '../decorators'

export interface ModuleMetadata {
  windows: typeof Window[]
  components: typeof Component[]
}