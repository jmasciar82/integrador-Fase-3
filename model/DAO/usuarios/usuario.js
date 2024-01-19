const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    usuario: String,
    password: String,
    admin: Boolean
},{versionKey: false})

module.exports = UsuarioModel = mongoose.model('usuarios', usuarioSchema)