import { Component } from '../src'

import { Logger } from './logger.component'

@Component()
export class Service {
  public constructor(
    private readonly logger: Logger
  ) {
    logger.log('test')
  }
}
