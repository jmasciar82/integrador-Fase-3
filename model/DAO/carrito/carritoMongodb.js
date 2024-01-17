
const CnxMongoDB = require("../../dbMongo");

class ModelMongodb {
    
    obtenerCarrito = async () => {
        if (!CnxMongoDB.connection) return {};

        const carrito = await CnxMongoDB.db.collection('carrito').find({}).toArray()
        return carrito
    }

    guardarCarrito = async carrito => {
        try {
            // Utiliza insertOne para agregar un nuevo documento a la colección.
            await CnxMongoDB.db.collection('carrito').insertOne(carrito);
            return carrito
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
