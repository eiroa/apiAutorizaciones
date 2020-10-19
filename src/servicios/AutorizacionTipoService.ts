import {Connection} from "typeorm";
import {Repository} from "../conexiones/Conexion";
import {AutorizacionTipo} from "../modelos/AutorizacionTipo";

export class AutorizacionTipoService {

    constructor() {
    }

    getAutorizacionTipoRepository = async () => {
        const connection: Connection = await Repository.getConnection();
        const autorizacionRepository = await connection.getRepository(AutorizacionTipo);
        return autorizacionRepository;
    }

    getAutorizacionesTipo = async (params) => {
        const autorizacionRepository = await this.getAutorizacionTipoRepository();
        const response = await autorizacionRepository.createQueryBuilder("autorizacion")
            .where("autorizacion.activo = :activo", {activo: `${params.activo}`})
            .getMany();
        return this.mappeoRespuesta(response);
    }

    mappeoRespuesta(array: any[]) {
        const result: Partial<AutorizacionTipo>[] = array.map( x => {
            return {
                autorizacion_tipo_id: x.id,
                nombre: x.nombre,
                descripcion: x.descripcion
            };
        });
        return result;
    }
}