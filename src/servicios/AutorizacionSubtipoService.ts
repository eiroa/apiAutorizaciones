import {Connection} from "typeorm";
import {Repository} from "../conexiones/Conexion";
import {AutorizacionSubtipo} from "../modelos/AutorizacionSubtipo";
import {AutorizacionTipo} from "../modelos/AutorizacionTipo";


export class AutorizacionSubtipoService {
    constructor() {}

    getAutorizacionSubtipoRepository = async () => {
        const connection: Connection = await Repository.getConnection();
        const autorizacionRepository = await connection.getRepository(AutorizacionSubtipo);
        return autorizacionRepository;
    }


    getAutorizacionesSubtipo = async (params) => {
        const autorizacionRepository = await this.getAutorizacionSubtipoRepository();
        const response = await autorizacionRepository.createQueryBuilder("autorizacion")
            .where("autorizacion.activo = :activo", { activo:`${params.activo}` })
            .andWhere("autorizacion.autorizacionTipo = :autorizacionTipoId", { autorizacionTipoId:`${params.autorizacion_tipo_id}` })
            .getMany();
        return this.mappeoRespuesta(response);
    }

    mappeoRespuesta(array: any[]) {
        const result: Partial<AutorizacionSubtipo>[] = array.map( x => {
            return {
                autorizacion_subtipo_id: x.id,
                nombre: x.nombre,
                descripcion: x.descripcion
            };
        });
        return result;
    }
}