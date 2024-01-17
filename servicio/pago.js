// SDK de Mercado Pago
const { MercadoPagoConfig, Preference } = require('mercadopago');
const config = require ('../config.js')

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: config.MP_AccessToken, options: {timeout: 5000}});

const preference = new Preference(client);

module.exports = preference