
import { HttpError } from 'routing-controllers';

export class UserNotFoundError extends HttpError {
  constructor(message = 'User not found!') {
    super(404, message);
  }
}
