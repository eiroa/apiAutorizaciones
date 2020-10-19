export class QueryUtils {
    
    generateQueryTemp = (params) => {
        const result: any = {}
        result.nombre = params.nombre || '';
        result.documento = params.documento || '';

        return result;
    }

}