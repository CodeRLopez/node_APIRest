//Single responsibility principle
const express = require('express');
const ProductsService = require('../services/product.service')

//aqui no tenemos acceso a la app de express entonces crearemos un router y cambiaremos app.get por router.get y este router estara importado en el index.js

const router = express.Router();

const service = new ProductsService(); //creamos una instancia del servicio que creamos

// app.get('/products', (req, res) ya no se hara con el endpoint en especifico, solo se dejara la parte especializada solo se dejara el '/' y lo que siga despues del endpoint ya sea el filter o id 



//get

router.get('/', async(req, res) => {
    // const products = [];
    // const { size } = req.query;
    // const limit = size || 10;
    // for (let index = 0; index < limit; index++) {
    //     products.push({
    //         name: faker.commerce.productName(),
    //         price: parseInt(faker.commerce.price(), 10),
    //         image: faker.image.imageUrl(),
    //     })  
    // }     todo esto es logica de negocio, tiene que ir en services
    const products = await service.find();
    res.json(products);
});

//esta choca con las de /products/:id ya que toma la palabra filter como id y para esto la solucion es que todo lo que sea especifico debe de ir arriba de lo dinamico
router.get('/filter', (req, res) => {
    res.send('Yo soy un filter')
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    // if (id === '999') {
    //     res.status(404).json({
    //         message: "not found"
    //     });
    // } else {
    //     res.status(200).json({
    //         id,
    //         name: 'produc2',
    //         price: 2000
    //     });
    // }
    const product = await service.findOne(id);
    res.json(product);
});

//post 

router.post('/', async (req, res) => {
   const body = req.body; 
   const newProduct = await service.create(body);
   res.status(201).json(newProduct);
});

//patch

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body
    const product = await service.update(id, body)
    res.json(product);
 });
 
 //delete

 router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id)
    res.json(rta);
 });

module.exports = router;