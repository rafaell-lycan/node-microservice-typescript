import { JsonController, Get } from "routing-controllers";

@JsonController()
export class HealthController {
  @Get("/_healthcheck")
  health() {
    return {
      status: 'OK',
      uptime: process.uptime()
    };
  }
}
