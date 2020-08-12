const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;//Get the ong_id from the header of the request

        const incidents = await connection('incidents')//Go to table incidents
            .where('ong_id', ong_id)//Search the ong_id that we get form request.headers
            .select('*');//Select all the incidents

        return response.json(incidents);//Return in response all the incidents
    }
}