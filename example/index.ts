import { Factory } from '../src'

import { AppModule } from './AppModule'

;(async () => {
  const app = await Factory.create(AppModule)
  //app.preventMultipleInstances()
  await app.start()
})()
