import { SINGLE_SCOPE_METADATA } from '../constants'

import { NucleiClassDecorator } from '../interfaces'
/*
* Makes the module single-scoped (not singleton).
* In this case, Nest will always create a new instance of this particular module when it's imported by another one.
*/
export function SingleScope(): NucleiClassDecorator {
  return (target) => {
    Reflect.defineMetadata(SINGLE_SCOPE_METADATA, true, target)
  }
}
