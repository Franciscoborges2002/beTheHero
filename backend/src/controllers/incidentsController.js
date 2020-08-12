const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query;

        const [count] = await connection('incidents').count();//Couhnt all the incidents that exists in database incidents

        const incidents = await connection('incidents')//Go to incidents table
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//Go to ongs table and get ALL the data of the id that we have
        .limit(5)//Limit each page to 5 incidents
        .offset((page - 1) *5)//To get the each page 5 incidents and get the same to the next ones
        .select(['incidents.*',
         'ongs.name', 
         'ongs.email', 
         'ongs.whatsapp',
         'ongs.city',
         'ongs.postal'
        ]);//Get all columns of incidents table and select some of the ongs table

        response.header('X-Total-Count', count['count(*)']);//Send to headers response to client the number of incidents that exists

        return response.json(incidents);//List all information from incidents columns
    },
    async create(request,response) {
        const { title, description, value} = request.body;//Get from the body of request
        const ong_id = request.headers.authorization;//Get the ong_id from the header of the request

        const [id] = await connection('incidents').insert({//Insert in table incidents the data
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });//Return the id of the incident
    },
    async delete(request, response) {//
        const { id } = request.params;//Get the id from the params (url)
        const ong_id = request.headers.authorization;//Get the ong_id from the header of the request

        const incidents = await connection('incidents')//Go to table incidents
        .where('id', id)//Search the id that we get form request.parms
        .select('ong_id')//Get the ong_id that created that id
        .first();//It's just having one id so we can get th first and only 

        if(incidents.ong_id != ong_id){//In the ong_id that create the incidents isn't equal to the ong_id that is trying to delete it
            return response.status(401).json({ error: 'Operation not permited.'});//Put the status of 401 = Unauthorized
        }

        await connection('incidents').where('id', id).delete();//If the ong_id that create the incident = ong_id that request delete the incident

        return response.status(204).send();//If succes send status 204(no content)
    }
}
