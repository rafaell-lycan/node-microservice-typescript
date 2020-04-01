import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

import config from '../../config'
import logger from '../../utils/logger';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

  error(error: HttpError, _request: Request, response: Response, _next: NextFunction): void {
    const name = error.name;
    const stack = error.name;
    const message = error.message || 'Something went wrong.';
    const status = error.httpCode || 500;

    if (config.IS_PROD) {
      logger.error(name, message);
    } else {
      logger.error(name, stack);
    }

    response.status(status).send({
      name,
      status,
      message,
    });

  }

}
