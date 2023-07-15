import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './api/auth/auth.module';
import { JwtAuthGuard } from './api/auth/jwt.auth.guard';
import { HealthModule } from './api/health/health.module';
import { AccountModule } from './api/account/account.module';

@Module({
  imports: [DatabaseModule, HealthModule, AuthModule, AccountModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
