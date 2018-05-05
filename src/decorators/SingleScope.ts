import { SINGLE_SCOPE_METADATA } from '../constants'

import { NucleiClassDecorator } from '../types'

/*
* Makes the module single-scoped (not singleton).
* In this case, Nuclei will always create a new instance of this particular module when it's imported by another one.
*/
export function SingleScope(): NucleiClassDecorator {
  return (module) => {
    Reflect.defineMetadata(SINGLE_SCOPE_METADATA, true, module)
  }
}
