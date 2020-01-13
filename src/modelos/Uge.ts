import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

    @Entity(`${process.env.DB_NAME}.UGE`)
    export class Uge {
       
    @PrimaryGeneratedColumn({name:"UGE_ID"})
    id: number;

    @Column({name : "UGE_NOMBRE"})
    nombre : string   
}