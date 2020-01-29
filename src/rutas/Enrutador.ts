
import { InstitucionControlador } from "../controladores/InstitucionControlador";
import { TipoInternacionConstrolador } from "../controladores/TipoInternacionControlador";

export class Enrutador {

    private rutas: any;
    
    private institucionControlador: InstitucionControlador;
    private tipoInternacionControlador: TipoInternacionConstrolador;

    constructor(){
        this.institucionControlador = new InstitucionControlador();
        this.tipoInternacionControlador = new TipoInternacionConstrolador;
    }

    public iniciar(express: any) {
        this.rutas = express.Router();

        this.rutas.route('/instituciones/:id/auditorias')
        .get(this.institucionControlador.obtenerAuditoriasPorInstitucion)
        
        this.rutas.route('/instituciones/tipos')
        .get(this.tipoInternacionControlador.obtenerTipoInternaciones); 

        this.rutas.route('/instituciones/uges')
        .get(this.institucionControlador.obtenerUge); 

        this.rutas.route('/instituciones/:id')
        .get(this.institucionControlador.obtenerInstitucionPorID);

        this.rutas.route('/instituciones')
        .get(this.institucionControlador.obtenerInstituciones)
        .post(this.institucionControlador.insertarInstituciones);

        this.rutas.route('/instituciones/:id/mensajes')
        .get(this.institucionControlador.obtenerMensajesPorInstitucion);

        this.rutas.route('/instituciones/:id/usuarios')
        .get(this.institucionControlador.obtenerAuditoresPorInstitucion);

    }

    public obtenerRutas(){
        return this.rutas;
    }

}

