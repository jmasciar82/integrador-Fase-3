const ModelMongodb = require('./productosMongodb.js');
const ModelFile = require('./productosFile.js');

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case 'MONGODB':
                console.log('Producto persistiendo en MONGODB');
                return new ModelMongodb(); // Asegúrate de llamar a la función constructora si es necesario

            case 'FILE':
                console.log('persistiendo en Archivo');
                return new ModelFile();

            default:
                console.log('persistiendo en memoria');
        }
    }
}

module.exports = ModelFactory;


