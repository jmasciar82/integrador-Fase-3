const config = require('../config.js');
const ftp = require('basic-ftp');
const fs = require('fs');

class Servicio {
    constructor() {}

    async subirArchivoFTP(file) {
        const timeout = 0;
        const client = new ftp.Client(timeout);

        try {
            client.ftp.verbose = true;
            await client.access({
                host: config.FTP_HOST,
                user: config.FTP_USER,
                password: config.FTP_PASS,
                secure: true,
            });

            console.log('***FTP conexión OK!!!!');

            console.log('*** subiendo archivo por FTP');

            //console.log(file);
            let bytesTotal = file.size
            //console.log(bytesTotal);
            client.trackProgress(info =>{
                let porcentaje = parseInt((info.bytes * 100) / bytesTotal)
                console.log(porcentaje + '%')})
            const src = file.path
            const dsc = `public_html/uploads/${file.filename}`
            await client.uploadFrom(src, dsc)

            console.log('*** upload OK');
            client.trackProgress()
            await fs.promises.unlink(file.path)

            return `https://${config.FTP_USER}.000webhostapp.com/uploads/${file.filename}`;
        } catch (error) {
            console.error('Error al subir archivo al FTP:', error.message);
            return '';
        } finally {
            await client.close();
        }
    }

    guardarArchivoFTP = async (file) => {
        const urlFotoFTP = await this.subirArchivoFTP(file);
        return urlFotoFTP;
    };
}

module.exports = Servicio;
