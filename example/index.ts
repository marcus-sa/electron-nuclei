import { Factory } from "../src";

import { AppModule } from "./app.module";

(async () => {
  await Factory.create(AppModule);
})();
