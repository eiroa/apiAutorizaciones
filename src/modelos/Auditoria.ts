import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

import { Usuario } from "./Usuario";
import { Estado } from "./Estado";
import { Institucion } from "./Institucion";

@Entity(`${process.env.DB_NAME}.AUDITORIA`)
export default class Auditoria {
       
    @PrimaryGeneratedColumn({name:"AUDITORIA_ID"})
    id: number;

    @Column({name : "CODIGO_AUTORIZACION"})
    codigoAutorizacion: number;
     
    @Column({name : "DOMICILIARIO"})
    domiciliario: number;

    @Column({name : "PROGRAMADA"})
    programada: number;

    @Column({name : "FECHA_EMISION"})
    fechaEmision: Date;

    @Column({name : "FECHA_INGRESO"})
    fechaIngreso: Date;

    @Column({name : "FECHA_EGRESO"})
    fechaEgreso: Date;

    @Column({name : "DIAS"})
    dias: number;

    @Column({name : "PRESCRIPTOR"})
    prescriptor: string;

    @Column({name : "OBSERVACIONES"})
    observaciones: string;

    @Column({name : "PLAN"})
    plan: string;

    @Column({name : "CATEGORIA"})
    categoria: string;

    @Column({name : "CREDENCIAL"})
    credencial: string;

    @Column({name : "DIAGNOSTICO_PRESUNTIVO"})
    diagnosticoPresuntivo: string;

    @Column({
      type: "smallint",
      name: "ACTIVO"
    })
	  activo:boolean;
	
    @ManyToOne(type => Estado )
    @JoinColumn({ name: 'ID_ESTADO', referencedColumnName: 'id' })
    estado: Estado;

    @ManyToOne(type => TipoInternacion)
    @JoinColumn({ name: 'ID_TIPO_INTERNACION', referencedColumnName: 'id' })
    tipoInternacion: TipoInternacion;

    @ManyToOne(type => Institucion)
    @JoinColumn({ name: 'ID_INSTITUCION', referencedColumnName: 'id' })
    institucion: Institucion;

    @ManyToMany(type => Usuario, usuario => usuario.auditoria)
    @JoinTable({
      name: 'ASIGNACION',
      joinColumns: [
          { name: 'ID_AUDITORIA', referencedColumnName: 'id' }
      ],
      inverseJoinColumns: [
        { name: 'ID_USUARIO', referencedColumnName: 'id' },
      ]
    })
    usuario: Usuario[];

 @ManyToOne(type => Paciente)
    @JoinColumn({ name: 'ID_PACIENTE', referencedColumnName: 'id' })
    paciente: Paciente;

}
