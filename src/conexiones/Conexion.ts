import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import { Institucion } from "../modelos/Institucion";
import { TipoInternacion } from "../modelos/TipoInternacion";
import { Uge } from "../modelos/Uge";
import {Mensaje} from "../modelos/Mensaje";
import {Usuario} from "../modelos/Usuario";
import Auditoria from "../modelos/Auditoria";
import { Estado } from "../modelos/Estado";

export class Conector {

    private static conexion: Connection;

    public static crearConexion = async () : Promise<Connection> => {
        if(!Conector.conexion) {
            if(Conector.conexion) {
                return Conector.conexion;
            } else {
                let opciones:any = {
                    type: process.env.DB_TYPE,
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT),
                    username: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    sid: process.env.DB_SID,
                    database :process.env.DB_NAME,
                    entities : [
                       Institucion,
                       TipoInternacion,
                       Uge,
                       Mensaje,
                       Usuario,
                       Auditoria,
                       Estado
                    ],
                    synchronize : false,
                    logging : true
                }
                const aConexion = await createConnection(opciones);
                Conector.conexion = aConexion;
            }
        }
        return Conector.conexion;
    }

    public static obtenerConexion = async () => {
        const connection = await Conector.crearConexion();
        return connection;
    }
}
