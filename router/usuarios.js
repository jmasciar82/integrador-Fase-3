const express = require('express')
const Controlador = require('../controlador/usuarios.js')

class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.post('/login', this.controlador.loginUsuario)
        this.router.post('/register', this.controlador.registerUsuario)

        return this.router
    }    
}


module.exports = Router