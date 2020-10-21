var request = require("request");
const assert = require('chai').assert;
var base_url = "http://localhost:8080/api";
const autorizaciones = "/autorizaciones";

describe("Auditoria de Terreno Server", () => {
  /*
  var server;

  before(function () {
    server = require('../src/server')
  });

  after(function () {
    server.close();
  });
  */
  autorizacionesTipoTest();
  autorizacionesSubtipoTest();
  autorizacionesPracticaTest();
});

  function autorizacionesTipoTest() {
    autorizacionesTest({
      title: "GET /Autorizaciones Tipo",
      endpointpath: "/tipo?activo=S",
      subtitle: "Test autorizacion tipo",
      method: "GET",
      keys: ['autorizacion_tipo_id', 'nombre', 'descripcion']
    }, "/tipo?activo=S");
  }

  function autorizacionesSubtipoTest() {
    autorizacionesTest({
      title: "GET /Autorizaciones Subtipo",
      endpointpath: "/subtipo?activo=S&autorizacion_tipo_id=1",
      subtitle: "Test autorizacion subtipo",
      method: "GET",
      keys: ['autorizacion_subtipo_id', 'nombre', 'descripcion']
    }, "/subtipo?activo=S&autorizacion_tipo_id=1");
  }

  function autorizacionesPracticaTest() {
    autorizacionesTest({
      title: "GET /Autorizaciones Practica",
      endpointpath: "/practica?activo=S&autorizacion_tipo_id=1&autorizacion_subtipo_id=1&id_Plan=123",
      subtitle: "Test autorizacion practica",
      method: "GET",
      keys: ['id', 'nombre', 'descripcion']
    }, "/practica?activo=S&autorizacion_tipo_id=1&autorizacion_subtipo_id=1&id_Plan=123");
  }

function autorizacionesTest(params: any, endpointPath) {
  describe(params.title, () => {
    it(params.subtitle, async () => {
      const options = {
        method: 'GET',
        uri: base_url + autorizaciones + endpointPath
      };
      const {response}:any = await asyncRequest(options);
      const jsonBody:any = JSON.parse(response.body);
      assert.equal(response.statusCode, 200);
      jsonBody.length > 0 ? assert.containsAllKeys(jsonBody[0], params.keys) : () => {};
    });
  });
}

const asyncRequest = async (value) => {
  return new Promise((resolve, reject) => {
    request(value, (error, response, data) => {
      if(error) reject(error)
      else resolve({response, data: (data)? data : undefined })
    })
  })
}
