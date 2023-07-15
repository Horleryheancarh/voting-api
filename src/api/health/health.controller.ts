import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/auth';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  @Get('/')
  @Public()
  getHealth() {
    //@todo: implement service by service check here.
    return 'All services are up and running';
  }
}
