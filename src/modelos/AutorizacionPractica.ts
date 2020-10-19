import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AutorizacionTipo} from "./AutorizacionTipo";
import {AutorizacionSubtipo} from "./AutorizacionSubtipo";
import {RequiereAutorizacion} from "./RequiereAutorizacion";

@Entity(`${process.env.DB_NAME}.AUTORIZACION_PRACTICA`)
export class AutorizacionPractica {

    @PrimaryGeneratedColumn({name: "AUTORIZACION_PRACTICA_ID"})
    id: number;

    @Column({name :'NOMBRE'})
    nombre: string;

    @Column({name :'DESCRIPCION'})
    descripcion: string;

    @ManyToOne(type => AutorizacionTipo, {primary : true} )
    @JoinColumn({name :'ID_TIPO_AUTORIZACION', referencedColumnName: "id"})
    tipoAutorizacion: AutorizacionTipo;

    @ManyToOne(type => AutorizacionSubtipo, {primary : true} )
    @JoinColumn({name :'ID_SUBTIPO_AUTORIZACION', referencedColumnName: "id"})
    subtipoAutorizacion: AutorizacionSubtipo;

    @OneToMany(type => RequiereAutorizacion, requiereAutorizacion => requiereAutorizacion.autorizacionPractica)
    requiereAutorizacion: RequiereAutorizacion[];

    @Column({name :'PLAZO'})
    activo: string;
}