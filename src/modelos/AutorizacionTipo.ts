import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AutorizacionPractica} from "./AutorizacionPractica";
import {AutorizacionSubtipo} from "./AutorizacionSubtipo";

@Entity(`${process.env.DB_NAME}.AUTORIZACION_TIPO`)
export class AutorizacionTipo {

    @PrimaryGeneratedColumn({name: "AUTORIZACION_TIPO_ID"})
    id: number;

    @Column({name :'NOMBRE'})
    nombre: string;

    @Column({name :'DESCRIPCION'})
    descripcion: string;

    @Column({name :'ACTIVO'})
    activo: string;

    @OneToMany(type => AutorizacionPractica, autorizacionPractica => autorizacionPractica.tipoAutorizacion)
    autorizacionPractica: AutorizacionPractica[];

    @OneToMany(type => AutorizacionSubtipo, autorizacionSubtipo => autorizacionSubtipo.autorizacionTipo)
    autorizacionSubtipo: AutorizacionSubtipo[];

}