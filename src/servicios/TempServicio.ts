import { Repository } from "../conexiones/Conexion";
import { Connection } from "typeorm";
import HttpRequestError from "../errores/HttpRequestError";

import { Temp } from "../modelos/Temp";

export class TempService {

    constructor() {}

    getTemp = async () => {
        const tempRepository = await this.getRepository();
        const response = await tempRepository.find();
        return response;
    }

    getTemp2 = async (params) => {
        const tempRepository = await this.getRepository();
        const response = await tempRepository.createQueryBuilder("temp")
            .where("temp.nombre like :nombre", { nombre:`%${params.nombre}%` })
            .andWhere("temp.documento like :documento", { documento:`%${params.documento}%` })
            .orderBy("temp.id", "ASC")
            .getMany();
        return response; 
    }

    saveTemp = async (temp) => {
        const tempRepository = await this.getRepository();
        const response = await tempRepository.save(temp);
        console.log('Temp guardado', response);
    }

    getTempById = async (id) => {
        const tempRepository = await this.getRepository();
        const response = tempRepository.findByIds(id);
        return response;
    }
    
    updateTemp = async (id, temp) => {
        const tempRepository = await this.getRepository();
        const response = tempRepository.update(id, temp);
        return response;
    }

    getRepository = async () => {
        const connection: Connection = await Repository.getConnection();
        const tempRepository = await connection.getRepository(Temp);
        return tempRepository;
    }

    getTempByletter = async (params) => {
        const tempRepository = await this.getRepository();
        const response = tempRepository.createQueryBuilder('temp')
            .where('temp.documento like :documento', {documento:`%${params.documento}%`}).getMany();
    }
}

