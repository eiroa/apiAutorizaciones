
import {Request, Response, response} from "express";
import HTTPResponseHandler from "../agentes/HTTPResponseHandler";
import { TempService } from "../servicios/TempServicio";
import { QueryUtils } from "../componentes/QueryUtils";
import {AutorizacionTipoService} from "../servicios/AutorizacionTipoService";
import {AutorizacionSubtipoService} from "../servicios/AutorizacionSubtipoService";
import {AutorizacionPracticaService} from "../servicios/AutorizacionPracticaService";

export class Controlador {

    private serviceAutorizaciones: AutorizacionTipoService;
    private serviceAutorizacionSubtipo: AutorizacionSubtipoService;
    private serviceAutorizacionPractica: AutorizacionPracticaService;
    private servicio: TempService;
    private queryUtils: QueryUtils;
    
    constructor() {
        this.serviceAutorizaciones = new AutorizacionTipoService();
        this.serviceAutorizacionSubtipo = new AutorizacionSubtipoService();
        this.serviceAutorizacionPractica = new AutorizacionPracticaService();
        this.servicio = new TempService();
        this.queryUtils = new QueryUtils();
    }

    deleteTemp = async (req:Request , res: Response) => {
        res.send('asdad');
    }

    getTemp = async (req:Request , res: Response) => {
        try {
            const response = await this.servicio.getTemp();
            res.send(response);
        } catch (e) {
            res.status(500);
            res.send({error: 'Hubo un error'})
        }
    }

    getTemp2 = async (req:Request , res: Response) => {
        const params = this.queryUtils.generateQueryTemp(req.query);
        try {
            const response = await this.servicio.getTemp2(params);
            res.send(response);
        } catch (e) {
            res.status(500);
            res.send({error: 'Hubo un error'})
        }
    }

    saveTemp = async (req:Request , res: Response) => {
        try {
            const response = await this.servicio.saveTemp(req.body);
            res.status(201);
            res.send();
        } catch (e) {
            res.status(500);
            res.send({error: 'Hubo un error'})
        }
    }

    getTempById = async (req:Request , res: Response) => {
        try {
            const response = await this.servicio.getTempById(req.params.id);
            res.send(response);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send({error: 'Hubo un error'})
        }
    }

    updateTemp = async (req:Request , res: Response) => {
        try {
            const response = await this.servicio.updateTemp(req.params.id, req.body);
            res.send(response);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send({error: 'Hubo un error'})
        }
    }

    getAutorizacionesTipo = async (req:Request , res: Response) => {
        try {
            const response = await this.serviceAutorizaciones.getAutorizacionesTipo(req.query);
            res.send(response);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send({error: 'Hubo un error'})
        }
    }

    getAutorizacionesSubtipo = async (req:Request , res: Response) => {
        try {
            const response = await this.serviceAutorizacionSubtipo.getAutorizacionesSubtipo(req.query);
            res.send(response);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send({error: 'Hubo un error'})
        }
    }

    getAutorizacionPractica = async  (req: Request, res: Response) => {
        try {
            const response = await this.serviceAutorizacionPractica.getAutorizacionesPractica(req.query);
            res.send(response);
        } catch (e) {
            console.error(e);
            res.send({error: 'Hubo un error'})
        }
    }

}
