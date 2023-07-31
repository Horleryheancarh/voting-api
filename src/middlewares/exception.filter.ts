import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const cause = exception.cause;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const email = req.user ? req.user.email : '';
    const response = {
      url: `${req.method} ${req.url}`,
      message: exception.message,
      status,
      errors:
        exception instanceof HttpException ? exception.getResponse() : null,
      cause,
    };

    res.header('statusText', exception.message);

    if (status == HttpStatus.INTERNAL_SERVER_ERROR)
      this.logger.error({ exception, email });

    httpAdapter.reply(res, response, status);
  }
}
