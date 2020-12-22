import { Module } from '@nestjs/common';
import { TelefonoController } from './telefono.controller';
import { TelefonoService } from './telefono.service';

@Module({
  controllers: [TelefonoController],
  providers: [TelefonoService]
})
export class TelefonoModule {}
