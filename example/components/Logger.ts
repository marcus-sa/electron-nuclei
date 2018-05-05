import { Component } from '../../src'
import { Service } from '.'

@Component()
export class Logger {

  public constructor(
    private readonly service: Service
  ) {}

  public log(msg: string) {
    console.log(msg)
  }

}