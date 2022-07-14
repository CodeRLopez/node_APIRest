const boom = require('@hapi/boom');

function validatorHandler(schema, property) { //esta es una funcion que va a retornarme un middleware y se vuelve dinamico por el hecho de que a traves de la funcion le paso valores
  return (req, res, next) => {
    const data = req[property]; //la property es para saber donde encontrar la info ya sea en el body, en params o query dependiendo si es una peticion get, post o patch
    const { error } = schema.validate(data, {abortEarly: false});
    if (error) {
      next(boom.badRequest(error)); //si encuentra eerores el va a mandar el error
    }
    next(); // si no encuentra errores todo continua
  }
}

module.exports = validatorHandler;