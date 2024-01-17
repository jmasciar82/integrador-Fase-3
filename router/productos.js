const express = require('express');
const Controlador = require('../controlador/productos');

class Router {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador()
    }

    start() {
        this.router.get('/:id?', this.controlador.obtenerProductos);
        this.router.post('/', this.controlador.guardarProducto);
        this.router.put('/:id', this.controlador.actualizarProducto);
        this.router.delete('/:id', this.controlador.borrarProducto);

        return this.router;
    }
}

module.exports = Router;  // Cambio en la forma de exportar
