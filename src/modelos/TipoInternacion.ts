import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Auditoria from "./Auditoria";

@Entity(`${process.env.DB_NAME}.TIPO_INTERNACION`)
export class TipoInternacion {
       
    @PrimaryGeneratedColumn({name:"TIPO_INTERNACION_ID"})
    id: number;

    @Column({name : "TIPO_INTERNACION_NOMBRE"})
    nombre : string   

    @OneToMany(type => Auditoria, auditoria => auditoria.tipoInternacion)
    auditorias: Auditoria[];
}