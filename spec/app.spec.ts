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

    it("GET /Instituciones", async () => {
      const options = {
        method: 'GET',
        uri: base_url+endpoint
      };
      const response:any = await asyncRequest(options);
      assert.equal(response.response.statusCode, 200);

    });

    it("GET /Instituciones by ID", async () => {
      const options = {
        method: 'GET',
        uri: base_url+endpoint+'/1'
      };
      const response:any = await asyncRequest(options);
      assert.equal(response.response.statusCode, 200);
    });

    it("GET /Auditorias by Institucion ID", async () => {
       const options = {
        method: 'GET',
        uri: base_url+endpoint+ '/1/auditorias'
      };
      const response:any = await asyncRequest(options);
      assert.equal(response.response.statusCode, 200);
    });

    it("GET /Uges", async () => {
      const options = {
        method: 'GET',
        uri: base_url+endpoint+ '/uges'
      };
      const response:any = await asyncRequest(options);
      assert.equal(response.response.statusCode, 200);

    });

    it("GET /Tipos de Internacion", async () => {
      const options = {
        method: 'GET',
        uri: base_url+endpoint+ '/tipos'
      };
      const response:any = await asyncRequest(options);
      assert.equal(response.response.statusCode, 200);
    });

    it("GET /Usuarios de Internacion", async () => {
      const options = {
        method: 'GET',
        uri: base_url+endpoint+ '/3886' + '/usuarios'
      };
      const response:any = await asyncRequest(options);
      assert.equal(response.response.statusCode, 200);
    });

    it("GET /Mensajes de Instituciones", async () => {
      const options = {
        method: 'GET',
        uri: base_url+endpoint+ '/3886' + '/mensajes'
      };
      const response:any = await asyncRequest(options);
      assert.equal(response.response.statusCode, 200);
    });

  });

});

const asyncRequest = async (value) => {
  return new Promise((resolve, reject) => {
       request(value, (error, response, data) => {
           if(error) reject(error)
           else resolve({response, data: (data)? JSON.parse(data) : undefined })
           })
         })
}

