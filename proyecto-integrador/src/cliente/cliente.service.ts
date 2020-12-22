import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from 'src/factura/factura.entity';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { ClienteDTO } from './clienteDTO';

@Injectable()
export class ClienteService {

    constructor(
        @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
        @InjectRepository(Factura) private readonly facturaRepository: Repository<Factura>

    ) { }

    public async getAll(): Promise<Cliente[]> {
        /*console.log("getAll de clientes")
        const result = await this.clienteRepository.query("select * from e01_cliente");
        console.log("resultado: " + result);
        let clientes: Cliente[] = [];
        result.forEach(element => {
            let c: Cliente= new Cliente(    element['nombre'],
                                            element['apellido'],
                                            element['direccion'],
                                            element['activo'])
            c.setNroCliente(element['nro_cliente']);
            clientes.push(c);
        });
        return clientes;
        */
        const result: Cliente[] = await this.clienteRepository.find({
            relations:["facturas"]
        });
        return result;
    }

    public async getClienteById(id: number): Promise<Cliente> {
        const result: Cliente = await this.clienteRepository.findOne(id);
        return result;
    }


    /*public async getClienteByletra(letra:string):Promise<Cliente[]>{
        try {
            let response: Cliente = await this.clienteRepository.find({
                where: [{
                    "nombre": ('%'+letra)
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
    }*/

    public async addCliente(clienteDTO:ClienteDTO):Promise<string>{
        const cliente: Cliente = new Cliente();
        cliente.setNombre(clienteDTO.nombre); //= clienteDTO.getNombre();
        cliente.setApellido(clienteDTO.apellido);// = clienteDTO.getApellido();
        cliente.setDireccion(clienteDTO.direccion);// = clienteDTO.getDireccion();
        cliente.setActivo(clienteDTO.activo);//= clienteDTO.getActivo();
        await this.clienteRepository.save(cliente);
        return "ok";
    }


    public async updateCliente(id: number, clienteDTO: ClienteDTO): Promise<string> {
        const cliente: Cliente = await this.clienteRepository.findOne(id);
        if (!cliente){
            throw new HttpException('el cliente no existe!', 404);
        } else {
            cliente.setNombre(clienteDTO.nombre); //= clienteDTO.getNombre();
            cliente.setApellido(clienteDTO.apellido);// = clienteDTO.getApellido();
            cliente.setDireccion(clienteDTO.direccion);// = clienteDTO.getDireccion();
            cliente.setActivo(clienteDTO.activo);//= clienteDTO.getActivo();
            await this.clienteRepository.save(cliente);
            return "ok";
        }
    }

    public async deleteCliente(id: number): Promise<string> {
        const cliente: Cliente = await this.clienteRepository.findOne(id);
        if (!cliente){
            throw new HttpException('el cliente no existe!', 404);
        } else {
            await this.clienteRepository.delete(id);
            return "ok";
    }

    }


}
