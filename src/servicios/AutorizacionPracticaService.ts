import {Connection} from "typeorm";
import {Repository} from "../conexiones/Conexion";
import {AutorizacionPractica} from "../modelos/AutorizacionPractica";
import {RequiereAutorizacion} from "../modelos/RequiereAutorizacion";

export class AutorizacionPracticaService {

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
        const requiereAutorizacionRepository = await this.getRequiereAutorizacionRepository();
        const requiereAutorizaciones: RequiereAutorizacion[] = await requiereAutorizacionRepository.find();
        const requiereAutorizacion = requiereAutorizaciones.find( x => x.idPlan == params.id_plan);

        const autorizacionRepository = await this.getAutorizacionSubtipoRepository();
        const autorizacionPractica = await autorizacionRepository.createQueryBuilder("autorizacionPractica")
            .where("autorizacionPractica.activo = :activo", { activo:`${params.activo}` })
            .andWhere("autorizacionPractica.tipoAutorizacion = :autorizacionTipoId", { autorizacionTipoId:`${params.autorizacion_tipo_id}` })
            .andWhere("autorizacionPractica.subtipoAutorizacion = :autorizacionSubtipoId", { autorizacionSubtipoId:`${params.autorizacion_subtipo_id}` })
            .getOne();

        let respuestaAutorizacionPractica: Partial<AutorizacionPractica> = null;
        if (autorizacionPractica) {
             respuestaAutorizacionPractica = {
                ...autorizacionPractica,
                requiere: requiereAutorizacion?.requiere
            };
        }
        return respuestaAutorizacionPractica;
    }

}