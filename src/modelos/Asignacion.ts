import { PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Auditoria from "./Auditoria";
import {Usuario} from "./Usuario";

@Entity(`${process.env.DB_NAME}.ASIGNACION`)
export class Asignacion {

    
    @PrimaryGeneratedColumn({name : "ASIGNACION_ID"})
    id: number;
    
    @Column({name : "FECHA_ASIGNACION"})
    fechaAsignacion : Date;   

    @ManyToOne(type => Auditoria , {primary : true})
    @JoinColumn({ name: 'ID_AUDITORIA', referencedColumnName: 'id' })
    auditoria: Auditoria;
        
    @ManyToOne(type => Usuario , {primary : true})
    @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'id' })
    usuario: Usuario;

    @Column({name : "ACTIVO"})
    activo: number;
}