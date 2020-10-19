import {Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";

@Entity(`${process.env.DB_NAME}.TEMP`)
export class Temp {

    @PrimaryGeneratedColumn({name: "ID"})
    id: number;

    @Column({name : "NOMBRE"})
    nombre: string;

    @Column({name : "DOCUMENTO"})
    documento: number;
}
