const { MongoClient } = require('mongodb');
const config = require('../config.js');

class CnxMongoDB {
    static client = null;
    static db = null
    static connection  = false

    static conectar = async () => {
        try {
            console.log('Conectando a la base de datos...');
            CnxMongoDB.client = await MongoClient.connect(config.STRGCNX);

            CnxMongoDB.db = CnxMongoDB.client.db(config.BASE)

            CnxMongoDB.connection = true

            console.log('Base de datos conectada');
        } catch (error) {
            console.log(`Error en conexión: ${error.message}`);
        }
    }
}

module.exports = CnxMongoDB;
