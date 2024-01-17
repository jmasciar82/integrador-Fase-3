const { ObjectId } = require("mongodb");
const CnxMongoDB = require("../../dbMongo.js");

class ModelMongodb {
    obtenerProductos = async () => {
        if (CnxMongoDB.connection == false) return [];
        const productos = await CnxMongoDB.db.collection('productos').find({}).toArray();
        return productos;
    }

    obtenerProducto = async id => {
        if (!CnxMongoDB.connection) return {};

        try {
            const producto = await CnxMongoDB.db.collection('productos').findOne({ _id: new ObjectId(id) });
            return producto || {};
        } catch (error) {
            console.error('Error al obtener el producto:', error.message);
            return {};
        }
    }

    guardarProducto = async producto => {
        try {
            // Utiliza insertOne para agregar un nuevo documento a la colección.
            const result = await CnxMongoDB.db.collection('productos').insertOne(producto);
            return result.ops[0] || {};  // Devuelve el documento insertado.
        } catch (error) {
            console.error('Error al guardar el producto:', error.message);
            return {};
        }
    }

    actualizarProducto = async (id, producto) => {
        try {
            // Utiliza findOneAndUpdate para actualizar un documento en la colección.
            const result = await CnxMongoDB.db.collection('productos').findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: producto },
                { returnDocument: 'after' }
            );
            return result.value || {};  // Devuelve el documento actualizado.
        } catch (error) {
            console.error('Error al actualizar el producto:', error.message);
            return {};
        }
    }

    borrarProducto = async id => {
        try {
            // Utiliza findOneAndDelete para eliminar un documento en la colección.
            const result = await CnxMongoDB.db.collection('productos').findOneAndDelete(
                { _id: new ObjectId(id) }
            );
            return result.value || {};  // Devuelve el documento eliminado.
        } catch (error) {
            console.error('Error al borrar el producto:', error.message);
            return {};
        }
    }
}

module.exports = ModelMongodb;
