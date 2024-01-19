const ModelFactory = require('../model/DAO/usuarios/usuariosFactory.js')
const config = require('../config.js')


class Servicio {

    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    loginUsuario = async credenciales => {
        const usuarios = await this.model.obtenerUsuarios()

        console.log(credenciales)
        console.log(usuarios)

        const usuarioLogueadoOk = usuarios.filter(c => c.usuario === credenciales.usuario && c.password === credenciales.password )
        if(usuarioLogueadoOk.length === 1) {
            const usuario = usuarioLogueadoOk[0].usuario
            const admin = usuarioLogueadoOk[0].admin
            return { status: 'loginOk', usuario, admin }
        }
        else {
            return { status: 'loginError' }
        }
    }

    registerUsuario = async credenciales => {
        const usuarioRegistrado = await this.model.guardarUsuario(credenciales)
        return usuarioRegistrado
    }
}

module.exports= Servicio

