//const model = require('../model/productosMem')
//const ModelFile = require('../model/DAO/productosFile')

const ModelFactory = require("../model/DAO/productos/productosFactory.js")
const config = require("../config.js")
const validar = require("./validaciones/producto.js")



class Servicio {

    constructor() {
        //this.model = new ModelFile

        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)

    }

    obtenerProductos = async (id) => {
        try {
            if (id) {
                const producto = await this.model.obtenerProducto(id);
                return producto;
            } else {
                const productos = await this.model.obtenerProductos();
                return productos;
            }
        } catch (error) {
            console.error("Error in Axios call:", error);
            throw error; // rethrow the error to propagate it up
        }
    }


    guardarProducto = async producto => {

        const error = validar(producto)
        if (!error) {

            const productoGuardado = await this.model.guardarProducto(producto)
            return productoGuardado
        } else {
            /* console.log(error.details[0].message);
            return {} */
            throw new Error(error.details[0].message)
        }
    }

    actualizarProducto = async (id, producto) => {
        const productoActualizado = await this.model.actualizarProducto(id, producto)
        return productoActualizado
    }

    borrarProducto = async id => {
        const productoEliminado = await this.model.borrarProducto(id)
        return productoEliminado
    }
}

module.exports = Servicio

