const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select('*');//Select all from ong table

        return response.json(ongs);//The response return it's going to be all information from ongs
    },
    async create(request, response){
        const { name, email, whatsapp, city, postal } = request.body;//Get from the body of request

        const id = generateUniqueId();
        await connection('ongs').insert({//Insert all data that we get from the request of body to the table ongs
            id,
            name,
            email,
            whatsapp,
            city,
            postal,
        })

        return response.json({ id });//Return the id of the ong
    }
}