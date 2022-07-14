const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().alphanum().min(3).max(15);
const price = joi.number().integer().min(10); //aqui los creamos individua para luego a la hora de hacer el schema solo decir si son requeridos o no

const createProductchema = joi.object({
    name: name.required,
    price: price.required,
});

const updateProductchema = joi.object({
    name: name,
    price: price,
});

const getProductchema = joi.object({
    id: id.required(),
});


module.exports = {
    createProductchema,
    updateProductchema,
    getProductchema,
};