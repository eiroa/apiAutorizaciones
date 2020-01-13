import { Conector } from "../conexiones/Conexion";
import { TipoInternacion } from "../modelos/TipoInternacion";



export class TipoInternacionServicio {

    constructor() {}

    public obtenerTipoInternaciones = async () => {
        let conexion = await this.obtenerRepositorio();
        const tipoInternacionRepositorio =  conexion.getRepository(TipoInternacion);
        const res = await tipoInternacionRepositorio.createQueryBuilder('tipo')
                          .getMany();
        return res;

    }

    private obtenerRepositorio = async () => {
        return await Conector.obtenerConexion();
    }
}