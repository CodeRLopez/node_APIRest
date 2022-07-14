const express = require('express');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');

function routerApi(app) {
    //para no estar poniendo muchas rutas repitiendo el api/v1 nos traemos el import de express para usar el router 

    // app.use('api/v1/products', productsRouter);
    // app.use('api/v1/categories', categoriesRouter);
    // app.use('api/v1/users', usersRouter);

    
    const router = express.Router();
    app.use('/api/v1', router); //creamos un path global y asi solo creamos otro para version 2 si se necesita

    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', usersRouter);
}

module.exports = routerApi;