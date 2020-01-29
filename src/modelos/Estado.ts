import { PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn } from "typeorm";
import Auditoria from "./Auditoria";


@Entity(`${process.env.DB_NAME}.ESTADO`)
export class Estado {
    @PrimaryGeneratedColumn({name:"ESTADO_ID"})
    id: number;

    @Column({name : "ESTADO_NOMBRE"})
    nombre : string;   

    @OneToMany(type => Auditoria , auditoria => auditoria.estado )
    auditorias: Auditoria [];
}