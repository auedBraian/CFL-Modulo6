import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/cliente.entity';
import { Equal, Repository } from 'typeorm';
import { Factura } from './factura.entity';
import { FacturaDTO } from './facturaDTO';

@Injectable()
export class FacturaService {

    constructor(
        @InjectRepository(Factura) private readonly facturaRepository: Repository<Factura>,
        @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>

    ) { }

    public async getAll(): Promise<Factura[]> {
        try {
            const result: Factura[] = await this.facturaRepository.find({
                relations: ["cliente"]
            });
            return result;
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request" + error,
            }, HttpStatus.NOT_FOUND);
        }

    }


    public async getByFactura(facturaId: number): Promise<Cliente> {
        try {
            let response: Cliente = await this.clienteRepository.findOne({
                where: [{
                    "nro_cliente": Equal(facturaId)
                }]
            });
            return response;
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request" + error,
            }, HttpStatus.NOT_FOUND);
        }

    }



    public async getFacturaByNroFactura(nro_factura: number): Promise<Factura> {
        try {
            const result: Factura = await this.facturaRepository.findOne(nro_factura);
            return result;
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request" + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async addFactura(facturaDTO: FacturaDTO): Promise<string> {

        try {
            const factura: Factura = new Factura();
            factura.setFecha(facturaDTO.fecha);
            factura.setTotalSinIva(facturaDTO.total_sin_iva);
            factura.setIVA(facturaDTO.iva);
            factura.setTotalConIva(facturaDTO.total_con_iva);
            //    factura.setNro_Cliente(facturaDTO.nro_cliente);
            await this.facturaRepository.save(factura);
            return "ok";
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request" + error,
            }, HttpStatus.NOT_FOUND);
        }
    }


    public async updateFactura(nro_factura: number, facturaDTO: FacturaDTO): Promise<string> {
        try {
            const factura: Factura = await this.facturaRepository.findOne(nro_factura);
            if (!factura) {
                throw new HttpException('el cliente no existe!', 404);
            } else {
                factura.setFecha(facturaDTO.fecha);
                factura.setTotalSinIva(facturaDTO.total_sin_iva);
                factura.setIVA(facturaDTO.iva);
                factura.setTotalConIva(facturaDTO.total_con_iva);
                //      factura.setNro_Cliente(facturaDTO.nro_cliente);
                await this.facturaRepository.save(factura);
                return "ok";
            }
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request" + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async deleteFactura(nro_factura: number): Promise<string> {
        try {
            const factura: Factura = await this.facturaRepository.findOne(nro_factura);
            if (!factura) {
                throw new HttpException('el cliente no existe!', 404);
            } else {
                await this.facturaRepository.delete(nro_factura);
                return "ok";
            }
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request" + error,
            }, HttpStatus.NOT_FOUND);
        }
    }
}