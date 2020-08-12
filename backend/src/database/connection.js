const knex = require('knex');
const configuration = require('../../knexfile');//Get the configuration in kexfile

const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development;

const connection = knex(config);//Set the connection as configuration development from knexfile

module.exports = connection;//To export connection