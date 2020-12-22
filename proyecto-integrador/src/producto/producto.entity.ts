import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('E01_PRODUCTO')
export class Producto{

    @PrimaryGeneratedColumn()
    private codigo_producto:number;

    @Column()
    private marca:string;
    
    @Column()
    private nombre:string;

    @Column()
    private descripcion:string;

    @Column()
    private precio:number;

    @Column()
    private stock:number;

    public constructor(marca?:string,nombre?:string,descripcion?:string,precio?:number,stock?:number){
        this.marca=marca;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.precio=precio;
        this.stock=stock;
    }

    public getCodigoProducto():number{
        return this.codigo_producto;
    }

    public setCodigoProducto(codigo_producto:number):void{
        this.codigo_producto=codigo_producto;
    }

    public getMarca():string{
        return this.marca;
    }

    public setMarca(marca:string):void{
        this.marca=marca;
    }

    public getDescripcion():string{
        return this.descripcion;
    }

    public setDescripcion(descripcion:string):void{
        this.descripcion=descripcion;
    }

    public getPrecio():number{
        return this.precio;
    }

    public setPrecio(precio:number):void{
        this.precio=precio;
    }

    public getStock():number{
        return this.stock;
    }

    public setStock(stock:number):void{
        this.stock=stock;
    }



}