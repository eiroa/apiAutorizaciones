export abstract class GestorParametros {

    obtenerPaginado = (offset:any , limit:any) => {

        let paginado:any = {};
        if (offset && limit) {
            paginado.limit = Number(limit);
            paginado.offset = Number(offset);
            paginado.offset = (Number(offset) - 1) * Number(limit);
        }
        return paginado;
    }

    public construirPaginado = (query: any, paginado: any) => {
        if (paginado) {
            query = query.limit(paginado.limit);
            query = query.offset(paginado.offset);
        }
        return query;
    }

}
