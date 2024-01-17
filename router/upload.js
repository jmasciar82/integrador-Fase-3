const express = require('express');
const Controlador = require('../controlador/upload.js');
const multer = require('multer');

const upload = multer({ dest: './uploads' });

class Router {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
    }

    start() {
        this.router.post('/', upload.single('archivo'), this.controlador.recibirArchivo);
        return this.router;
    }
}

module.exports = Router;
