import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { Factura } from './factura.entity';
import { FacturaService } from './factura.service';
import { FacturaDTO } from './facturaDTO';

@Controller('factura')
export class FacturaController {

    public constructor(private readonly facturaService:FacturaService,
    private clienteService:ClienteService){}

    @Get("get-all")
    public getAllFacturasRaw():Promise<Factura[]>{
        return this.facturaService.getAll();
    }

    @Get(':nro_factura')
    public getFacturaByNroFactura (@Param('nro_factura') nro_factura:number):Promise<Factura>{
        return this.facturaService.getFacturaByNroFactura(nro_factura);
    }
    
    @Post('add-factura')
       public addFactura(@Body() factura: FacturaDTO): Promise<string> {
        return this.facturaService.addFactura(factura);
    }

    @Put(':nro_factura')
       public updateFactura(@Param('nro_factura') nro_factura:number,@Body() factura: FacturaDTO): Promise<string> {
        return this.facturaService.updateFactura(nro_factura,factura);
    }
    @Delete(':nro_factura')
       public deleteFactura(@Param('nro_factura') nro_factura:number): Promise<string> {
        return this.facturaService.deleteFactura(nro_factura);
    }



}
