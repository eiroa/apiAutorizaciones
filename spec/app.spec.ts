var request = require("request");
const assert = require('chai').assert;
var base_url = "http://localhost:8080/api"

describe("Auditoria de Terreno Server", () => {

	var server;
	
	before(function () {
		server = require('../src/server')
	});
	
	after(function () {
		server.close();
	});

    describe("", () => {
        
        const endpoint = "/instituciones";

        it("GET /Instituciones", () => {
            request.get( base_url + endpoint, (error, response, body) => {
                assert.equal(response.statusCode, 200);
            });
        });

        it("GET /Instituciones by ID", () => {
            request.get( base_url + endpoint + '/1', (error, response, body) => {
                assert.equal(response.statusCode, 200);
            });
        });

        it("GET /Auditorias by Institucion ID", () => {
            request.get( base_url + endpoint + '/1/auditorias', (error, response, body) => {
                assert.equal(response.statusCode, 200);
            });
        });

        it("GET /Uges", () => {
            request.get( base_url + endpoint + '/uges', (error, response, body) => {
                assert.equal(response.statusCode, 200);
            });
        });

        it("GET /Tipos de Internacion", () => {
            request.get( base_url + endpoint + '/tipos', (error, response, body) => {
                assert.equal(response.statusCode, 200);
            });
        });

    });
});