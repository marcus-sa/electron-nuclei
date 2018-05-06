import { Component } from '../../src'

@Component()
export class Logger {

  public log(msg: string) {
    console.log(msg)
  }

}