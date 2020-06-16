const db = require("../data/db-config.js");
const { insert } = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id });
}

function findSteps(id) {
  return db("steps")
    .join("schemes", "schemes.id", "=", "steps.scheme_id") // the '=' is optional
    .select(
      "schemes.scheme_name as scheme",
      "steps.step_number as step",
      "steps.instructions as instruction"
    )
    .where({ scheme_id: id });
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    // .then(([id]) => {
    //   return findById(id);
    // });
}

function update(id, changes) {
    return db("schemes")
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db("schemes")
        .where({ id }).del()
}