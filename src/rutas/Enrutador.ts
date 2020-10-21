
import { Controlador } from "../controladores/Controlador";

export class Enrutador {

    private rutas: any;
    
    private controller: Controlador;
    private autorizaciones = "/autorizaciones";

    constructor(){
        this.controller = new Controlador();
    }

    public iniciar(express: any) {
        this.rutas = express.Router();

        this.rutas.route(this.autorizaciones + "/tipo")
            .get(this.controller.getAutorizacionesTipo);

        this.rutas.route(this.autorizaciones + "/subtipo")
            .get(this.controller.getAutorizacionesSubtipo);

        this.rutas.route(this.autorizaciones + "/practica")
            .get(this.controller.getAutorizacionPractica);
    }

    public obtenerRutas(){
        return this.rutas;
    }

}

