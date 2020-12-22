import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exception } from 'console';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>
    ) { }

    public async getAllRaw(): Promise<Producto[]> {
        /*  console.log("getAll de productos")
          const result = await this.productoRepository.query("select * from e01_producto");
          console.log("resultado: " + result);
          let productos: Producto[] = [];
          result.forEach(element => {
              let p: Producto= new Producto(  element['marca'],
                                              element['nombre'],
                                              element['descripcion'],
                                              element['precio'],
                                              element['stock'])
              p.setCodigoProducto(element['codigo_producto']);
              productos.push(p);
          });
          return productos; */
        try {
            const result: Producto[] = await this.productoRepository.find();
            return result;
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request" + error,
            }, HttpStatus.NOT_FOUND);
        }
    }




}





