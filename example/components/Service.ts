import { Component } from '../../src'

import { Logger } from './Logger'

@Component()
export class Service {
  public constructor(
    private readonly logger: Logger
  ) { }
}
