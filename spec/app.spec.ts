var request = require("request");
const assert = require('chai').assert;
var base_url = "http://localhost:8080/api"
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
  const autorizaciones = "/autorizaciones";
  describe("", () => {

    const endpoint = autorizaciones + "/tipo?activo=Sasdasd";
    it("GET /Autorizaciones Tipo", async () => {
      const options = {
        method: 'GET',
        uri: base_url+endpoint
      };
      const {response}:any = await asyncRequest(options);
      const jsonBody:any = JSON.parse(response.body);
      assert.equal(response.statusCode, 200);
      jsonBody.length > 0 ? assert.containsAllKeys(jsonBody[0],['autorizacion_tipo_id', 'nombre', 'descripcion']) : () => {};
    });
  });
});

const asyncRequest = async (value) => {
  return new Promise((resolve, reject) => {
    request(value, (error, response, data) => {
      if(error) reject(error)
      else resolve({response, data: (data)? data : undefined })
    })
  })
}
