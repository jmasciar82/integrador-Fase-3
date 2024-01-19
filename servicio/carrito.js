const ModelFactory = require('../model/DAO/carrito/carritoFactory.js')
const config = require('../config.js')

const preference = require('./pago.js');



class Servicio {
    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    obtenerCarrito = async _ => {
        const carrito = await this.model.obtenerCarrito()
        return carrito
    }

    guardarCarrito = async carrito => {
        const carritoGuardado = await this.model.guardarCarrito(carrito)
        return carritoGuardado
    }

    createPreference = async prefItems => {
        //console.log(prefItems)
        try {
            const preferences = await preference.create({
                body: {
                    items: prefItems.items,
                    back_urls: {
                        "success": `http://localhost:${config.PORT}/api/carrito/mp/feedback`,
                        "failure": `http://localhost:${config.PORT}/api/carrito/mp/feedback`,
                        "pending": `http://localhost:${config.PORT}/api/carrito/mp/feedback`
                    },
                    auto_return: "approved",
                }
            })
            return preferences.id
        }
        catch (error) {
            console.log(`Error al crear preferences: ${error.message}`)
            return null
        }
    }
}

module.exports = Servicio

