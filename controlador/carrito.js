const Servicio = require('../servicio/carrito.js')


class Controlador {

    constructor() {
        this.servicio = new Servicio()
    }

    obtenerCarrito = async (req, res) => {
        const { id } = req.params
        const carrito = await this.servicio.obtenerCarrito()
        res.json(carrito)
    }

    guardarCarrito = async (req, res) => {
        try {
            const carrito = req.body
            const carritoGuardado = await this.servicio.guardarCarrito(carrito)
            res.json(carritoGuardado)

        } catch (error) {

            res.json({ errMsg: error.message})

        }



    }

    feedback = async (req, res) => {
        //const info = res.query
        //console.log(info)

        const {payment_id, status, merchant_order_id} = req.query

        res.redirect(`http://localhost:8000/carrito?payment_id=${payment_id}&status=${status}&merchant_order_id=${merchant_order_id}`)
    }

    createPreference = async (req, res) =>{
        try {
            const prefItems = req.body
        //console.log(prefItems);
        const preferenceId = await this.servicio.createPreference(prefItems)
        res.json({preferenceId})
        } catch (error) {
            res.json({errMsg: error.message})
        }
        
    }

    
}

module.exports = Controlador