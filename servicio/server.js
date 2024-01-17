const express = require ('express')
const RouterProductos = require('./router/productos.js')
const config = require("./config.js")


const app = express()
app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// ------------------ Rutas / endpoints API RESTful -------------------
app.use('/api/productos', new RouterProductos().start())
app.use('/api/carrito', new RouterCarrito().start())

// ------------------- LISTEN DEL SERVIDOR ---------------------
const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor apiRestful escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))
