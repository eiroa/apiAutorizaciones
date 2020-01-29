import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Asignacion } from "./Asignacion";


@Entity(`${process.env.DB_NAME}.USUARIO`)
export default class Usuario {

    @PrimaryGeneratedColumn({name:"USUARIO_ID"})
    id: number;

    @Column({name:"USUARIO"})
    usuario: string;

    @Column({name:"EMAIL"})
    email: string;
    
    @Column({name:"OBSERVACIONES"})
    observaciones: string;
      
    @OneToMany(type => Asignacion, asignacion => asignacion.usuario)    
    asignaciones: Asignacion []; 
    
}


