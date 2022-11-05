const PooL = require("pg").Pool;
const POOL = new PooL({
  user: "postgres",
  password: "lmvit123",
  database: "FormDb_AddEmployee",
  port: 5432,
});
module.exports = POOL;
