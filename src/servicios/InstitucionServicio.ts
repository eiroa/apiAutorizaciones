import { Conector } from "../conexiones/Conexion";
import HttpRequestError from "../errores/HttpRequestError";
import { Institucion } from "../modelos/Institucion";
import { Mensaje } from "../modelos/Mensaje";
import {getConnection} from "typeorm";
import { Uge } from "../modelos/Uge";


export class InstitucionService {

    constructor() {}

    public obtenerInstituciones = async () => {
        let conexion = await this.obtenerRepositorio();
        const institucionRepositorio = conexion.getRepository(Institucion);
        const res = await institucionRepositorio.find();
        return res;
    }

    public obtenerInstitucionPorID = async (emplooyeID: number) => {
        let conexion = await this.obtenerRepositorio();
        const institucionRepositorio = conexion.getRepository(Institucion);
        const res = await institucionRepositorio.findOne(emplooyeID);
        return res;
    }

    public obtenerMensajesPorInstitucion = async (institucionId: number) => {
        const conexion = await this.obtenerRepositorio();
        const institucionRepositorio = conexion.getRepository(Mensaje);
        let query = await institucionRepositorio.createQueryBuilder('mensaje')
            .innerJoin('mensaje.instituciones' , 'institucion')
            .innerJoinAndSelect('mensaje.usuario', 'usuario')
            .where('institucion.id = :id', { id: institucionId })
            .orderBy({'mensaje.fecha': 'DESC' });

        const res = await query.getManyAndCount();
        return res;
    }

    public insertarInstituciones = async (instituciones: any []) => {
        let conexion = await this.obtenerRepositorio();
        let response: any = {};
        try {
            response = await getConnection(conexion.name).transaction(async transactionalEntityManager => {
                for (let i  = 0; i < instituciones.length; i++) {
                    let institucion = instituciones[i];
                    const exist = await transactionalEntityManager.getRepository(Institucion).findOne({prestador: institucion.prestador});
                    if (!exist){
                      let responseInstitucion = await transactionalEntityManager.getRepository(Institucion)
                      .save(institucion);    
                    }
                }
            });      
        } catch (error) {
            console.log(error);
            throw new HttpRequestError(HttpRequestError.ERROR_TYPE + " " + error);
        }  
        return response;  
    }

    public obtenerUges = async () => {
        let conexion = await this.obtenerRepositorio();
        const ugeRepositorio = conexion.getRepository(Uge);
        const res = await ugeRepositorio.find({order: {nombre : 'ASC'}});
        return res;
    }

    private obtenerRepositorio = async () => {
        console.log('llego a obtenerRepositorio');
        return await Conector.obtenerConexion();
    }
}
