import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModel, Accounts } from 'src/database/models/Accounts.model';
import { TokenModel, Tokens } from 'src/database/models/Tokens.model';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Accounts.name,
        schema: AccountModel,
      },
      {
        name: Tokens.name,
        schema: TokenModel,
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
