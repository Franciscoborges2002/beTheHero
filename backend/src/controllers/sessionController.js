const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;//Get the id from the request.body

        const ong = await connection('ongs')//Connect to ongs table in database
        .where('id', id)//Seatch the id 
        .select('name')//Get the name of id ong
        .first();//One ID = one ong so it's relative

        if(!ong){//If ong doesn't exist send an error
            return response.status(400).json({ error : 'No ong with this ID.'});//Send a 400 status error and a json text
        }

        return response.json(ong.name);//If there is an ong return the name of the ong
    }
}