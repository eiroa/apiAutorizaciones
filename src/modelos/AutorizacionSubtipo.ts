import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AutorizacionPractica} from "./AutorizacionPractica";
import {AutorizacionTipo} from "./AutorizacionTipo";
import {RequiereAutorizacion} from "./RequiereAutorizacion";

@Entity(`${process.env.DB_NAME}.AUTORIZACION_SUBTIPO`)
export class AutorizacionSubtipo {

    @PrimaryGeneratedColumn({name: "AUTORIZACION_SUBTIPO_ID"})
    id: number;

    @Column({name :'NOMBRE'})
    nombre: string;

    @Column({name :'DESCRIPCION'})
    descripcion: string;

    @Column({name :'ACTIVO'})
    activo: string;

    @OneToMany(type => AutorizacionPractica, autorizacionPractica => autorizacionPractica.subtipoAutorizacion)
    autorizacionPractica: AutorizacionPractica[];

    @OneToMany(type => RequiereAutorizacion, requiereAutorizacion => requiereAutorizacion.subtipoAutorizacion)
    requiereAutorizacion: RequiereAutorizacion[];

    @ManyToOne(type => AutorizacionTipo, {primary : true})
    @JoinColumn({name :'ID_TIPO_AUTORIZACION', referencedColumnName: "id"})
    autorizacionTipo: AutorizacionTipo;

}