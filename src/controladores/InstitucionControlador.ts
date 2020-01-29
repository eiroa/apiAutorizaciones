
import {Request, Response, response} from "express";
import HTTPResponseHandler from "../agentes/HTTPResponseHandler";
import { InstitucionService } from "../servicios/InstitucionServicio";
import { Institucion } from "../modelos/Institucion";
import { TipoInternacion } from "../modelos/TipoInternacion";
import { Uge } from "../modelos/Uge";
import { QueryUtils } from "../componentes/QueryUtils";

export class InstitucionControlador {

    private servicio: InstitucionService
    private queryUtils : QueryUtils
    
    constructor() {
        this.servicio = new InstitucionService();
        this.queryUtils = new QueryUtils();
    }

    public obtenerInstituciones = async (req: Request , res: Response ) => {
        let response = [];

        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let paginado:any = this.queryUtils.obtenerPaginado(offset , limit)

        try {
            response = await this.servicio.obtenerInstituciones(paginado);
            let payload:any = {};
            payload.instituciones = response[0];
            payload.metadatos = {};
            payload.metadatos.totales = response[1];
            res.send(payload);
            res.status(200);
        } catch (error) {
            HTTPResponseHandler.sendInternalError(res , error , null);
        }
    }

    public insertarInstituciones = async (req: Request , res: Response ) => {
        let payload:any = req.body;
        try {
            let response = await this.servicio.insertarInstituciones(payload.instituciones);
            res.status(201);
            res.send(response);
        } catch (error) {            
            HTTPResponseHandler.sendInternalError(res , error , null);
        }
    }

    public obtenerInstitucionPorID = (req: Request , res: Response ) => {
        let institucionID:number = parseInt(req.params.id);
        this.servicio.obtenerInstitucionPorID(institucionID)
        .then((institucion:Institucion) => {
            HTTPResponseHandler.sendSuccess(res , institucion);
        })
        .catch((err) => {
            console.log(err);
            HTTPResponseHandler.sendInternalError(res , err , null)
        });
    }

    public obtenerMensajesPorInstitucion = (req: Request , res: Response ) => {
        let institucionId: number = parseInt(req.params.id);
        this.servicio.obtenerMensajesPorInstitucion(institucionId)
            .then((response: any) => {
                const payload: any = {};
                payload.mensajes = response[0];
                payload.metadatos = {};
                payload.metadatos.total = response[1];
                HTTPResponseHandler.sendSuccess(res, payload);
            })
            .catch((err) => {
                console.log(err);
                HTTPResponseHandler.sendInternalError(res, err, null)
            });
    }

    public obtenerUge = async (req: Request , res: Response) => {
        let response: Uge [] = [];
        try {
            response = await this.servicio.obtenerUges();
            res.send(response);
            res.status(200);
        } catch (error) {
            HTTPResponseHandler.sendInternalError(res , error , null);
        }
    }

    public obtenerAuditoriasPorInstitucion = async (req: Request , res: Response) => {
        let response = [];
        let institucionID:number = parseInt(req.params.id);
        try {
            response = await this.servicio.obtenerAuditoriasPorInstitucion(institucionID);
            res.send(response);
            res.status(200);
        } catch (error) {
            console.error(error);
            HTTPResponseHandler.sendInternalError(res , error , null);
        }
    }
}
