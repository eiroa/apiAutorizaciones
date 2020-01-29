import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import Auditoria from "./Auditoria";
import { Mensaje } from "./Mensaje";

@Entity(`${process.env.DB_NAME}.INSTITUCION`)
export class Institucion {

    @PrimaryGeneratedColumn({name:"INSTITUCION_ID"})
    id: number;

    @Column({name : "PRESTADOR"})
    prestador : string;
     
    @Column({name :"LOCALIDAD_PRESTADOR"})
    localidadPrestador : string;

    @Column({name :"URL_IMAGEN"})
    urlImagen : string;

    @OneToMany(type => Auditoria, auditoria => auditoria.institucion)
    auditorias: Auditoria [];

    @ManyToMany(type => Mensaje, mensaje => mensaje.instituciones)
    @JoinTable({
        name: 'MENSAJE_INSTITUCION',
        joinColumns: [
            { name: 'ID_INSTITUCION', referencedColumnName: 'id' },
        ],
        inverseJoinColumns: [
            { name: 'ID_MENSAJE', referencedColumnName: 'id' }
        ]
    })
    mensajes: Mensaje[];
}
