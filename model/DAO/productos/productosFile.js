const { promises: fsPromises } = require('fs');

class ModelFile {
    constructor() {
        this.nombreArchivo = 'productos.json';
    }

    leerArchivo = async nombre => {
        try {
            const contenido = await fsPromises.readFile(nombre, 'utf-8');
            return JSON.parse(contenido);
        } catch (error) {
            return [];
        }
    };

    escribirArchivo = async (nombre, productos) => {
        await fsPromises.writeFile(nombre, JSON.stringify(productos, null, 2));
    };

    obtenerProductos = async () => {
        const productos = await this.leerArchivo(this.nombreArchivo);
        return productos;
    };

    obtenerProducto = async id => {
        const productos = await this.obtenerProductos();
        return productos.find(p => p.id == id) || {};
    };

    guardarProducto = async producto => {
        const productos = await this.obtenerProductos();
        producto.id = String(parseInt(productos[productos.length - 1]?.id || 0) + 1);
        if (producto.precio) producto.precio = Number(producto.precio);
        if (producto.stock) producto.stock = parseInt(producto.stock);
        productos.push(producto);
        await this.escribirArchivo(this.nombreArchivo, productos);
        return producto;
    };

    actualizarProducto = async (id, producto) => {
        producto.id = id;
        const productos = await this.obtenerProductos();
        const index = productos.findIndex(p => p.id == id);
        if (index != -1) {
            const productoAnt = productos[index];
            const productoNuevo = { ...productoAnt, ...producto };
            productos.splice(index, 1, productoNuevo);
            await this.escribirArchivo(this.nombreArchivo, productos);
            return productoNuevo;
        } else {
            return {};
        }
    };

    borrarProducto = async id => {
        const productos = await this.obtenerProductos();
        let producto = {};
        const index = productos.findIndex(p => p.id == id);
        if (index != -1) {
            producto = productos.splice(index, 1)[0];
            await this.escribirArchivo(this.nombreArchivo, productos);
        }
        return producto;
    };
}

module.exports = ModelFile;
