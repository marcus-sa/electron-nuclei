import { Component, forwardRef, Inject } from '../../src'

import { Logger } from './Logger'

@Component()
export class Service {

  constructor(
    @Inject(forwardRef(() => Logger))
    private readonly logger: Logger
  ) {
    console.log(logger)
  }

}
