import {Request, Response, response} from "express";
import {Connection} from "typeorm";
import {Repository} from "../conexiones/Conexion";
import {AutorizacionSubtipo} from "../modelos/AutorizacionSubtipo";
import {AutorizacionPractica} from "../modelos/AutorizacionPractica";
import {RequiereAutorizacion} from "../modelos/RequiereAutorizacion";

export class AutorizacionPracticaService {
    https = require('https');
    constructor() {}

    getAutorizacionSubtipoRepository = async () => {
        const connection: Connection = await Repository.getConnection();
        const autorizacionRepository = await connection.getRepository(AutorizacionPractica);
        return autorizacionRepository;
    }

    getRequiereAutorizacionRepository = async () => {
        const connection: Connection = await Repository.getConnection();
        const requiereAutorizacionRepository = await connection.getRepository(RequiereAutorizacion);
        return requiereAutorizacionRepository;
    }

    getAutorizacionesPractica = async (params: any) => {
        const autorizacionRepository = await this.getAutorizacionSubtipoRepository();
        const requiereAutorizacionRepository = await this.getRequiereAutorizacionRepository();
        const asociadoId = params.asociadoId;

        /*
        const requiereAutorizacion = await autorizacionRepository.createQueryBuilder("requiereAutorizacion")
            .where("autorizacion.activo = :activo", { activo:`${params.activo}` })
            .andWhere("autorizacion.autorizacionTipo = :autorizacionTipoId", { autorizacionTipoId:`${params.autorizacion_tipo_id}` })
            .getMany();
        */

        const autorizacionPractica = await autorizacionRepository.createQueryBuilder("autorizacionPractica")
            .where("autorizacionPractica.activo = :activo", { activo:`${params.activo}` })
            .andWhere("autorizacionPractica.tipoAutorizacion = :autorizacionTipoId", { autorizacionTipoId:`${params.autorizacion_tipo_id}` })
            .andWhere("autorizacionPractica.subtipoAutorizacion = :autorizacionSubtipoId", { autorizacionSubtipoId:`${params.autorizacion_subtipo_id}` })
            .getMany();
        return autorizacionPractica;
    }

    getPlan() {
        this.https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY' ,(respo) => {
        });
    }


}