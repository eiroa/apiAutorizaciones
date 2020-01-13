
import {Request, Response, response} from "express";
import HTTPResponseHandler from "../agentes/HTTPResponseHandler";
import { InstitucionService } from "../servicios/InstitucionServicio";
import { Institucion } from "../modelos/Institucion";
import { TipoInternacion } from "../modelos/TipoInternacion";
import { Uge } from "../modelos/Uge";

export class InstitucionControlador {

    private servicio: InstitucionService
    
    constructor() {
        this.servicio = new InstitucionService();
    }

    public obtenerInstituciones = async (req: Request , res: Response ) => {
        let response: Institucion [] = [];
        try {
            response = await this.servicio.obtenerInstituciones();
            res.send(response);
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
}