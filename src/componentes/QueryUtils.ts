export class QueryUtils {
    
    public obtenerPaginado = (offset:any , limit:any) => {

        let paginado:any = {};
        if (offset && limit) {
            paginado.limit = Number(limit);
            paginado.offset = Number(offset);
            paginado.offset = (Number(offset) - 1) * Number(limit);
        }
        return paginado;
    }

}