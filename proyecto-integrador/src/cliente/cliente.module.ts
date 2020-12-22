import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaController } from 'src/factura/factura.controller';
import { Factura } from 'src/factura/factura.entity';
import { FacturaService } from 'src/factura/factura.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cliente,
      Factura
    ])
  ],
  controllers: [ClienteController,FacturaController],
  providers: [ClienteService, FacturaService]
})
export class ClienteModule {}
