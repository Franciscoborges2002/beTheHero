exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table){//Start creating the table
    table.string('id').primary();//Column to id of ong
    table.string('name').notNullable();//Column to name of ong
    table.string('email').notNullable();//Column to email of ong
    table.string('whatsapp').notNullable();//Column whatsapp of ong
    table.string('city').notNullable();//Column to city of ong
    table.string('postal', 7).notNullable();//Column postal code of ong
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');//If there is some problem creating the table deleted it
};

//npx knex migrate:rollBack delete last migrate:latest that we made
//npx knex migrate:status know all migrate:latest that we made