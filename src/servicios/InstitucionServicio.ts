import { Conector } from "../conexiones/Conexion";
import HttpRequestError from "../errores/HttpRequestError";
import { Institucion } from "../modelos/Institucion";
import { Mensaje } from "../modelos/Mensaje";
import {getConnection} from "typeorm";
import { Uge } from "../modelos/Uge";
import { TipoInternacion } from "../modelos/TipoInternacion";
import { Usuario } from "../modelos/Usuario";

export class InstitucionService {

    constructor() {}

    public obtenerInstituciones = async (paginado:any) => {
        let conexion = await this.obtenerRepositorio();
        const institucionRepositorio = conexion.getRepository(Institucion);
        const res = await institucionRepositorio.createQueryBuilder("institucion")
                      
        .limit(paginado.limit)
        .offset(paginado.offset)
        .orderBy("institucion.id" , "ASC")
        .getManyAndCount();
        
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
        .andWhere('mensaje.activo = 1')
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

    public obtenerAuditoriasPorInstitucion = async (institucionID: number) => {
        let conexion = await this.obtenerRepositorio();
        const tiposRepositorio = conexion.getRepository(TipoInternacion);
        const query = tiposRepositorio.createQueryBuilder("tipoInternacion")
        const auditorias =  
        query.innerJoinAndSelect("tipoInternacion.auditorias" , "auditoria")
        .innerJoin("auditoria.institucion" , "institucion")
        .leftJoinAndSelect('auditoria.asignaciones', 'asignacion')
        .leftJoinAndSelect('asignacion.usuario', 'usuarios')
        .innerJoinAndSelect('auditoria.paciente', 'paciente')
        .leftJoin("auditoria.estado" , "estado")
        .where("estado.id = 1")
        .andWhere("institucion.id = :id" , {id : institucionID})
        .getMany();        
        
        return auditorias;
    }

  public obtenerAuditoresPorInstitucion = async (institucionId: number) => {
      const conexion = await this.obtenerRepositorio();
      const institucionRepositorio = conexion.getRepository(Usuario);
      let query = await institucionRepositorio.createQueryBuilder('usuario')
          .innerJoin('usuario.auditoria' , 'auditoria')
          .innerJoin('auditoria.institucion', 'institucion')
          .where('institucion.id = :id', { id: institucionId })

      const res = await query.getMany();
      return res;
  }
    private obtenerRepositorio = async () => {
        return await Conector.obtenerConexion();
    }
}
