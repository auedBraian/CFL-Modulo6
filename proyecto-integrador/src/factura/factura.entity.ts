import { Cliente } from "src/cliente/cliente.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('E01_FACTURA')
export class Factura{
    @PrimaryGeneratedColumn()
    private nro_factura:number;
    @Column()
    private fecha:Date;
    @Column()
    private total_sin_iva:number;
    @Column()
    private iva:number;
    @Column()
    private total_con_iva:number;
    

    @ManyToOne(type => Cliente, cliente => cliente.facturas)
    @JoinColumn({name: 'nro_factura'})
    public cliente: Cliente;


    public constructor(fecha?:Date, total_sin_iva?:number,iva?:number,total_con_iva?:number,nro_cliente?:number){
        this.fecha=fecha;
        this.total_sin_iva=total_sin_iva;
        this.iva=iva;
        this.total_con_iva=total_con_iva;
      //  this.nro_cliente=nro_cliente;
    }

    public getNroFactura():number{
        return this.nro_factura;
    }

    public setFecha(fecha:Date):void{
        this.fecha=fecha;
    }

    public setTotalSinIva(total_sin_iva:number):void{
        this.total_sin_iva=total_sin_iva;
    }

    public setTotalConIva(total_con_iva:number):void{
        this.total_con_iva=total_con_iva;
    }

    public setIVA(iva:number):void{
        this.iva=iva;
    }
 /*   public setNro_Cliente(nro_cliente:number){
        this.nro_cliente=nro_cliente;
    }

*/

}