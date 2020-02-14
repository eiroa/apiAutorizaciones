var request = require("request");
const assert = require('chai').assert;
var base_url = "http://localhost:8080/api"

describe("Auditoria de Terreno Server", () => {

	before(function () {
		server = require('../src/server')
	});
	
	after(function () {
		server.close();
	});


    describe("GET /Instituciones", () => {
        
        const endpoint = "/instituciones";

        it("returns status code 200", () => {
            request.get( base_url + endpoint, (error, response, body) => {
                assert.equal(response.statusCode, 200);
            });
        });
    });

    describe("GET /Instituciones by ID", () => {
        
        const endpoint = "/instituciones/1";

        it("returns status code 200", () => {
            request.get( base_url + endpoint, (error, response, body) => {
                assert.equal(response.statusCode, 200);
            });
        });
    });

    describe("GET /Auditorias by Institucion ID", () => {
        
        const endpoint = "/instituciones/1/auditorias";

        it("returns status code 200", () => {
            request.get( base_url + endpoint, (error, response, body) => {
                assert.equal(response.statusCode, 200);
            });
        });
    });

    describe("GET /Uges", () => {
        
        const endpoint = "/instituciones/uges";

        it("returns status code 200", () => {
            request.get( base_url + endpoint, (error, response, body) => {
                assert.equal(response.statusCode, 200);
            });
        });

    });

    describe("GET /Tipos de Internacion", () => {
        
        const endpoint = "/instituciones/tipos";

        it("returns status code 200", () => {
            request.get( base_url + endpoint, (error, response, body) => {
                assert.equal(response.statusCode, 200);
            });
        });

    });
});