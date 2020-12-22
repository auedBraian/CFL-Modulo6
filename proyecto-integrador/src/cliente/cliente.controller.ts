import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FacturaService } from 'src/factura/factura.service';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';
import { ClienteDTO } from './clienteDTO';

@Controller('cliente')
export class ClienteController {

    public constructor(private readonly clienteService:ClienteService,
        private facturaService:FacturaService){}

    @Get("get-all")
    public getAllClientesRaw():Promise<Cliente[]>{
        return this.clienteService.getAll();
    }

    @Get(':id')
    public getClienteById (@Param('id') id:number):Promise<Cliente>{
        return this.clienteService.getClienteById(id);
    }
    
    /*@Get(':letra')
    public getClienteByLetra (@Param('letra') letra:string):Promise<Cliente[]>{
        return this.clienteService.getClienteByletra(letra);
    }*/


    @Post('add-cliente')
       public addCliente(@Body() cliente: ClienteDTO): Promise<string> {
        return this.clienteService.addCliente(cliente);
    }

    @Put(':id')
       public updateCliente(@Param('id') id:number,@Body() cliente: ClienteDTO): Promise<string> {
        return this.clienteService.updateCliente(id,cliente);
    }
    @Delete(':id')
       public deleteCliente(@Param('id') id:number): Promise<string> {
        return this.clienteService.deleteCliente(id);
    }

}
