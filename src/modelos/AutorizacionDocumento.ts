import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AutorizacionPractica} from "./AutorizacionPractica";


@Entity(`${process.env.DB_NAME}.AUTORIZACION_DOCUMENTO`)
export class AutorizacionDocumento {

    @PrimaryGeneratedColumn({name: "AUTORIZACION_DOCUMENTO_ID"})
    id: number;

    @Column({name :'NOMBRE'})
    nombre: string;

    @Column({name :'DESCRIPCION'})
    descripcion: string;

    @ManyToOne(type => AutorizacionPractica, {primary : true} )
    @JoinColumn({name :'ID_AUTORIZACION_PRACTICA', referencedColumnName: "id"})
    autorizacionPractica: AutorizacionPractica;

    @Column({name :'OBLIGATORIO'})
    obligatorio: string;
}
