const express = require('express');
const Controlador = require('../controlador/carrito.js');

class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.get('/', this.controlador.obtenerCarrito)
        this.router.post('/', this.controlador.guardarCarrito)
        this.router.get('/mp/feedback', this.controlador.feedback)
        this.router.post('/mp/create_preference', this.controlador.createPreference)

        return this.router
    }    
}


module.exports = Router