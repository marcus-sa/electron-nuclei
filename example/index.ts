import { Factory } from '../src'

import { AppModule } from './AppModule'

;(async () => {
  const app = await Factory.create(AppModule, {
    processPath: process.cwd(),
    portable: false,
    development: process.env.NODE_ENV === 'development',
    crashReporter: 'some url to report to'
  })
  
  app.preventMultipleInstances(() => {})

  await app.start()
})()
