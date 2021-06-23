
exports.up = function(knex) {
    return knex.raw(`alter table product add description text;`);

};

exports.down = function(knex) {
  
};
