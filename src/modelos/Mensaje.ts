import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";
import { Institucion } from "./Institucion";
import { Usuario } from "./Usuario";

@Entity(`${process.env.DB_NAME}.MENSAJE`)
export class Mensaje {
       
    @PrimaryGeneratedColumn({name:"MENSAJE_ID"})
    id: number;

    @Column({name : "MENSAJE"})
    mensaje: string;

    @Column({name : "FECHA"})
    fecha: Date;

    @ManyToOne(type => Usuario, usuario => usuario.mensajes)
    @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'id' })
    usuario: Usuario;

    @ManyToMany(type => Institucion, institucion => institucion.mensajes)
    @JoinTable({
        name: 'MENSAJE_INSTITUCION',
        joinColumns: [
            { name: 'ID_MENSAJE', referencedColumnName: 'id' }
        ],
        inverseJoinColumns: [
            { name: 'ID_INSTITUCION', referencedColumnName: 'id' },
        ]
    })
    instituciones: Institucion[];
}
