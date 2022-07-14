const express = require('express');
const routerApi = require('./routes')

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


app.listen(port, () => {
    console.log('Mi port '+ port + ' esta funcionando. ve a: http://localhost:3000/')
})
