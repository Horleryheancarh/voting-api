import { ApiProperty } from '@nestjs/swagger';
import { Accounts } from 'src/database/models/Accounts.model';

export class AuthenticatedAccountDto {
  @ApiProperty({
    example: {
      _id: '64b5a0956bc57cc5e5367d4b',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
    },
  })
  account: Accounts;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VybmFtZSI6InRlc3QxMjMiLCJpZCI6IjY0YjVhMDk1NmJjNTdjYzVlNTM2N2Q0YiIsImlhdCI6MTY4OTY0MjM4M30.s48jsGmNO4M-CIreJQbg3Zp5eElNeCMovfMVA8we21w',
  })
  token: string;
}
