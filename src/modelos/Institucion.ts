import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Auditoria from "./Auditoria";

@Entity(`${process.env.DB_NAME}.INSTITUCION`)
export class Institucion {
       
    @PrimaryGeneratedColumn({name:"INSTITUCION_ID"})
    id: number;

    @Column({name : "PRESTADOR"})
    prestador : string 
     
    @Column({name :"LOCALIDAD_PRESTADOR"})
    localidadPrestador : string;

    @Column({name :"URL_IMAGEN"})
    urlImagen : string;    

    @OneToMany(type => Auditoria, auditoria => auditoria.institucion)
    auditorias: Auditoria [];
}
