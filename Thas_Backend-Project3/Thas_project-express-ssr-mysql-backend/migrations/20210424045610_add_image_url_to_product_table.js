
exports.up = function(knex) {
  return knex.raw('alter table product add image text')
};

exports.down = function(knex) {
  return knew.raw('alter table product drop image')
};
