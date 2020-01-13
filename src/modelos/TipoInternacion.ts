import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity(`${process.env.DB_NAME}.TIPO_INTERNACION`)
export class TipoInternacion {
       
    @PrimaryGeneratedColumn({name:"TIPO_INTERNACION_ID"})
    id: number;

    @Column({name : "TIPO_INTERNACION_NOMBRE"})
    nombre : string   
}