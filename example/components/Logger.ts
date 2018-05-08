import 'reflect-metadata'

import { Component, forwardRef, Inject } from '../../src'

import { Service } from './Service'

@Component()
export class Logger {

  constructor(
    @Inject(forwardRef(() => Service))
    private readonly service: Service
  ) {
		console.log(service)
  }

  public log(msg: string) {
    console.log(msg)
  }

}