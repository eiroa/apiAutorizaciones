import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Mensaje} from "./Mensaje";
import { Asignacion } from "./Asignacion";
import Auditoria from "./Auditoria";

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

    @ManyToMany(type => Auditoria, auditoria => auditoria.usuario)
    @JoinTable({
      name: 'ASIGNACION',
      joinColumns: [
          { name: 'ID_USUARIO', referencedColumnName: 'id' },
      ],
      inverseJoinColumns: [
          { name: 'ID_AUDITORIA', referencedColumnName: 'id' }
      ]
    })
    auditoria: Auditoria[];
}
