import { JsonController, Get } from "routing-controllers";

import config from "../../config";

@JsonController()
export class HealthController {
  @Get("/_healthcheck")
  health() {
    return {
      app: config.APPLICATION_NAME,
      status: 'OK',
      uptime: process.uptime()
    };
  }
}
