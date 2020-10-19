import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {AutorizacionPractica} from "./AutorizacionPractica";
import {AutorizacionSubtipo} from "./AutorizacionSubtipo";
import {AutorizacionTipo} from "./AutorizacionTipo";

@Entity(`${process.env.DB_NAME}.REQUIERE_AUTORIZACION`)
export class RequiereAutorizacion {

    @Column({name: 'REQUIERE_AUTORIZACION_ID'})
    id: number;

    @Column({name: 'ID_PLAN'})
    idPlan: string;

    @Column({name: 'REQUIERE'})
    requiere: string;

    @ManyToOne(type => AutorizacionPractica, {primary : true} )
    @JoinColumn({name :'ID_AUTORIZACION_PRACTICA', referencedColumnName: "id"})
    autorizacionPractica: AutorizacionPractica;

    @ManyToOne(type => AutorizacionSubtipo, {primary : true} )
    @JoinColumn({name :'ID_AUTORIZACION_SUBTIPO', referencedColumnName: "id"})
    subtipoAutorizacion: AutorizacionSubtipo;

}