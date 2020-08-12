const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');//Celebrate is used to validate the information

const ongController = require('./controllers/ongController');
const incidentsController = require('./controllers/incidentsController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();//Separate the expresse Router to one constant 

routes.post('/sessions', sessionController.create);//

routes.get('/ongs', ongController.index);//List ongs
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({//On params body we need to verify the keys: name, email, whatsapp, city, postal
        name: Joi.string().required(),//Name needs to be a string and is required
        email: Joi.string().required().email(),//Email needs to be a string, required and of course an email
        whatsapp: Joi.number().required().min(9),//Whatsapp needs to be a number, required and its a number so a minimum of 9 numbers
        city: Joi.string().required(),//City needs to be a string and is required
        postal: Joi.string().required().min(7).max(7),//Postal needs to be a number, required and 7 of length
    })
}), ongController.create);//Create ongs

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.index);//List the incidents of one ong_id

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentsController.index);//List incidents

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(10),
        description: Joi.string().required().min(10),
        value: Joi.number().required().min(1),
    })
}),incidentsController.create);//Create incidents

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), incidentsController.delete);//Delete incidents with the id of the incident that the ong wants to delete

module.exports = routes;//To export the file to index.js