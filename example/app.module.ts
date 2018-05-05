import { Module } from "../src";

import { Service } from "./service.component";
import { MainWindow } from "./windows/main.window";
import { Logger } from "./logger.component";

@Module({
  windows: [MainWindow],
  components: [Service, Logger]
})
export class AppModule {}
