import { crashReporter } from 'electron'

import { AppEvents } from './events'
import { SingleScope, Component, Subscribe } from './decorators'
import { Config } from './Config'

@Component()
@SingleScope()
export class CrashReporter {

  constructor(private readonly config: Config) {}

  @Subscribe(AppEvents.WILL_FINISH_LAUNCHING)
  protected start() {
    const submitURL = this.config.get('app.crashReporter')

    if (submitURL) {
      const appName = this.config.get('app.name')
  
      crashReporter.start({
        companyName: appName,
        productName: appName,
        submitURL
      })
    }
  }

}