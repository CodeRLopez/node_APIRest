const faker = require('faker');
const boom = require('@hapi/boom');

class productsServices {

    constructor() {
        this.products = [];
        this.generate(); //cada vez que se genere una instancia de servicios se va a ejecutar esta funcion para generar 
    }

    generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean(), //va a mandar true o false de mandera random
            });  
        }
    }

    //Aqui tiene que ir todo el manejo transaccional de un producto, toda la logica

    async create(data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
            // name: data.name,
            // price: data.price,
            // image: data.image,
        }
        this.products.push(newProduct);
        return newProduct;
    };

    find() {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve (this.products);
            }, 3000)  //Aqui simulamos un delay asi como si pidieramos la informacion desde una fuente externa y como retorna una primesa tenemos que hacer uso del async await en la funcion donde lo recibe.
        });
    };

    async findOne(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            throw boom.notFound('Product not found');
        }
        if (product.isBlock) { //aqui se evaluara si el producto esta bloqueado y en el caso en que lo este mandara un error de tipo conflict que sera 409
            throw boom.conflict('Product is blocked');
        }
        return product;
    };

    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        } 
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes //se hacede esta forma para que permanezcan los valores anteriores mas los cambios
        };
        return this.products[index];
    };

    async delete(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        } 
        this.products.splice(index, 1);
        return {
            message: `El producto con id: ${id} ha sido eliminado`
        }
    };
}

module.exports = productsServices