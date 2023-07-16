import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const loggerInstance = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('api.hotspot', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
  ],
});
