let express = require('express');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let cors = require('cors');

//For SWAGGER
const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');

import { Enrutador } from "./rutas/Enrutador";
import Interceptor from "./interceptor/Interceptor";
import { Health } from "./componentes/Health";

// Create and configure ExpressJS.
export class App {

    private express:any;
    private enrutador:Enrutador;
    private health: Health;

    constructor() {
        this.enrutador = new Enrutador();
        this.health = new Health()
        
        this.express = express();
        this.configurarMiddleware();
        this.configurarApi();
    }

    // Config Express configurarMiddleware.
    private configurarMiddleware(): void {
        this.express.use(bodyParser.json({limit: "50mb"}));
        this.express.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
        this.express.use(bodyParser.json({ type: 'application/vnd.api+json' }));
        this.express.use(methodOverride('X-HTTP-Method-Override'));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
    }

    // Init Routes.
    private configurarApi(): void {
        //this.express.use(Interceptor.intercept);
        this.enrutador.iniciar(express);
        this.health.iniciar(express);
        this.express.use('/api', this.enrutador.obtenerRutas());
        this.express.use('/health', this.health.obtenerRutas())
       
        //Configurar documento swagger antes de descomentar
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    public obtenerExpress:Function = () => {
        return this.express;
    }
}

