import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Mensaje} from "./Mensaje";
import { Asignacion } from "./Asignacion";

@Entity(`${process.env.DB_NAME}.USUARIO`)
export class Usuario {

    @PrimaryGeneratedColumn({name: "USUARIO_ID"})
    id: number;

    @Column({name : "USUARIO"})
    usuario: string;

    @Column({name : "OBSERVACIONES"})
    observaciones: string;

    @Column({name : "EMAIL"})
    email: string;

    @Column({
        type: "smallint",
        name: "ACTIVO"
    })
    activo: boolean;

    @OneToMany(type => Asignacion, asignacion => asignacion.usuario)    
    asignaciones: Asignacion []; 

    @OneToMany(type => Mensaje, mensaje => mensaje.usuario)
    mensajes : Mensaje [];
}
