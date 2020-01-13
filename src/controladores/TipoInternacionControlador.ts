
import {Request, Response, response} from "express";
import HTTPResponseHandler from "../agentes/HTTPResponseHandler";
import { TipoInternacionServicio } from "../servicios/TipoInternacionServicio";

export class TipoInternacionConstrolador {

    private servicio: TipoInternacionServicio;
    
    constructor() {
        this.servicio = new TipoInternacionServicio();
    }

    public obtenerTipoInternaciones = async (req: Request , res: Response ) => {
        
        try {
            let response = await this.servicio.obtenerTipoInternaciones();
            HTTPResponseHandler.sendSuccess(res , response);
        } catch (error) {
            console.log(error);
            HTTPResponseHandler.sendInternalError(res , error , null);
        }
    }

}