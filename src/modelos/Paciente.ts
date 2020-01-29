import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Auditoria from "./Auditoria";

@Entity(`${process.env.DB_NAME}.PACIENTE`)
export class Paciente {
       
    @PrimaryGeneratedColumn({name:"PACIENTE_ID"})
    id: number;

    @Column({name : "TIPO_DOCUMENTO"})
    tipoDocumento : string 
     
    @Column({name :"NRO_DOCUMENTO"})
    nroDocumento : string;

    @Column({name : "NOMBRE"})
    nombre: string;

    @Column({name :"APELLIDO"})
    apellido : string;
    
    @Column({name : "FECHA_NACIMIENTO"})
    fechaNacimiento : Date;

    @Column({name : "FECHA_INGRESO_MEDIFE_ASE"})
    fecheIngresoMedifeAse : Date;

    @Column({name : "EMPRESA"})
    empresa : string
    
    @OneToMany(type => Auditoria, auditoria => auditoria.paciente)
    auditorias: Auditoria [];
    
}