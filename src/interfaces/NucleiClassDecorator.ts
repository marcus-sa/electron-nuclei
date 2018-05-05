import { NucleiType } from './NucleiType'

export type NucleiClassDecorator = (target: NucleiType, key?: string | Symbol, descriptor?: PropertyDescriptor) => any