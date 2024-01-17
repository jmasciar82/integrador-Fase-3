const dotenv = require('dotenv');


dotenv.config()

const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || 'MONGODB' 
const PORT = process.env.PORT || 8080
//const STRGCNX = 'mongodb://localhost:27017'
const STRGCNX = process.env.STRGCNX || 'mongodb://127.0.0.1'
const BASE = process.env.BASE || 'test'
const FTP_HOST = process.env.FTP_HOST || ''
const FTP_USER = process.env.FTP_USER || ''
const FTP_PASS = process.env.FTP_PASS || ''

const MP_AccessToken = process.env.MP_AccessToken || ''


module.exports = {MODO_PERSISTENCIA, PORT, STRGCNX, BASE, FTP_HOST, FTP_USER, FTP_PASS, MP_AccessToken}
