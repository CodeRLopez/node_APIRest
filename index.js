const express = require('express');
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

//para que podamos ver en la respuesta que mandemos el json que devolvemos del body
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mi server en express');
})

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola esta es una nueva ruta');
})

routerApi(app);

app.use(logErrors); // si en el middleware no ejecutaramos next() no pasaria al siguiente middleware que seria errorHandler
app.use(boomErrorHandler);
app.use(errorHandler); //hay que tener cado en que orden ponemos los middlewares porque de esa manera se ejecutaran ya que son secuenciales


app.listen(port, () => {
    console.log('Mi port '+ port + ' esta funcionando. ve a: http://localhost:3000/')
})
