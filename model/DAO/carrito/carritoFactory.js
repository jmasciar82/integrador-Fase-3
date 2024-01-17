const ModelMongodb = require('../carrito/carritoMongodb.js');

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case 'MONGODB':
                console.log('Carrito persistiendo en MONGODB');
                return new ModelMongodb(); // Asegúrate de llamar a la función constructora si es necesario

            

                default:
                    console.error(`Modo de persistencia desconocido: ${tipo}`);
                    throw new Error(`Modo de persistencia desconocido: ${tipo}`);
            }
    }
}

module.exports = ModelFactory;


