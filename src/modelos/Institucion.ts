import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity(`${process.env.DB_NAME}.INSTITUCION`)
export class Institucion {
       
    @PrimaryGeneratedColumn({name:"INSTITUCION_ID"})
    id: number;

    @Column({name : "PRESTADOR"})
    prestador : string 
     
    @Column({name :"LOCALIDAD_PRESTADOR"})
    localidadPrestador : string;

    @Column({name :"URL_IMAGEN"})
    urlImagen : string;    
}
