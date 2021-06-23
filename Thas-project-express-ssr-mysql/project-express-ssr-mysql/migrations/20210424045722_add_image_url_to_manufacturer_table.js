
exports.up = function(knex) {
  return knex.raw('alter table manufacturer add image text')
};

exports.down = function(knex) {
  return knex.raw('alter table manufacturer drop image')
};
