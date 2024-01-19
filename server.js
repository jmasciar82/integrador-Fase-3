const express = require('express')
const RouterProductos = require('./router/productos')
const config = require("./config.js")
const CnxMongodb = require('./model/dbMongo.js')


const RouterCarrito = require('./router/carrito.js')
const RouterUsuarios = require('./router/usuarios.js')
const RouterUpload = require('./router/upload.js')

const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ------------------ Rutas / endpoints API RESTful -------------------
app.use('/api/productos', new RouterProductos().start())
app.use('/api/carrito', new RouterCarrito().start())
app.use('/api/usuarios', new RouterUsuarios().start())

app.use('/api/upload', new RouterUpload().start())


// ------------------- LISTEN DEL SERVIDOR ---------------------
if (config.MODO_PERSISTENCIA == 'MONGODB') {
    CnxMongodb.conectar()
}

const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor apiRestful escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))
