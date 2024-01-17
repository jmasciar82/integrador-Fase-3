const Servicio = require('../servicio/upload.js')


class Controlador {

    constructor() {
        this.servicio = new Servicio
    }

    recibirArchivo = async (req,res) => {

        const file = req.file
        const urlFotoFTP = await this.servicio.guardarArchivoFTP(file)

        res.json({urlFotoFTP})
    }
}


module.exports = Controlador