exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){//Start creating the table
        table.increments();//Every time that run that table add +1 on last incident created
        table.string('title').notNullable();//Column to tittle of incident
        table.string('description').notNullable();//Column to description of incident
        table.decimal('value').notNullable();//Column to value of incident

        table.string('ong_id').notNullable();//Column to get the id of the ong that created the incident

        table.foreign('ong_id').references('id').inTable('ongs');//Go to table ong and get the value of id
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');//If there is some problem creating the table deleted it
};
