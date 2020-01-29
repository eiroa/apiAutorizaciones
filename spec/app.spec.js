var request = require("request");

var base_url = "http://localhost:8080/api"

describe("Auditoria de Terreno Server", () => {

    describe("GET /Instituciones", () => {
        
        const endpoint = "/instituciones";

        it("returns status code 200", () => {
            request.get( base_url + endpoint, (error, response, body) => {
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe("GET /Instituciones by ID", () => {
        
        const endpoint = "/instituciones/1";

        it("returns status code 200", () => {
            request.get( base_url + endpoint, (error, response, body) => {
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe("GET /Auditorias by Institucion ID", () => {
        
        const endpoint = "/instituciones/1/auditorias";

        it("returns status code 200", () => {
            request.get( base_url + endpoint, (error, response, body) => {
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe("GET /Uges", () => {
        
        const endpoint = "/instituciones/uges";

        it("returns status code 200", () => {
            request.get( base_url + endpoint, (error, response, body) => {
                expect(response.statusCode).toBe(200);
            });
        });

    });

    describe("GET /Tipos de Internacion", () => {
        
        const endpoint = "/instituciones/tipos";

        it("returns status code 200", () => {
            request.get( base_url + endpoint, (error, response, body) => {
                expect(response.statusCode).toBe(200);
            });
        });

    });
});