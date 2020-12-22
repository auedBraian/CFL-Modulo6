import { Factura } from "src/factura/factura.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('E01_CLIENTE')
export class Cliente{

    @PrimaryGeneratedColumn()
    private nro_cliente:number;

    @Column()
    private nombre:string;
    
    @Column()
    private apellido:string;

    @Column()
    private direccion:string;

    @Column()
    private activo:boolean;

    @OneToMany((type) => Factura, factura => factura.cliente)
    public facturas:Factura[];

    public constructor(nombre?:string,apellido?:string,direccion?:string,activo?:boolean){
        this.nombre=nombre;
        this.apellido=apellido;
        this.direccion=direccion;
        this.activo=activo;
    }

    public getNroCliente():number{
        return this.nro_cliente;
    }

    public setNroCliente(nro_cliente:number):void{
        this.nro_cliente=nro_cliente;
    }

    public setNombre(nombre:string):void{
        this.nombre=nombre;
    }

    public setApellido(apellido:string):void{
        this.apellido=apellido;
    }

    public setDireccion(direccion:string):void{
        this.direccion=direccion;
    }
    public setActivo(activo:boolean){
        this.activo=activo;
    }
}