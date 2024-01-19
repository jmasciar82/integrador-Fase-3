const ModelMongoDB = require("../usuarios/usuariosMongoDB.js")
//import ModelMem from "../usuarios/usuariosMem.js"

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            /* case 'MEM':
                console.log('**** usuarios Persistiendo en Memoria ****')
                return new ModelMem()
 */
            case 'MONGODB':
                console.log('**** usuarios Persistiendo en MongoDB ****')
                return new ModelMongoDB()

            default:
                console.log('**** usuarios Persistiendo en Memoria (default) ****')
                return new ModelMem()
        }
    }
}

module.exports = ModelFactory