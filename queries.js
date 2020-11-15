require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
pool.on('error', () => console.log('Lost Postgres connection'));

const helloRoute = (request, response) => {
  const { name } = request.params;
  const count = 1;

  pool
    .query(
      "INSERT INTO names (name, count) VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET count= names.count + 1",
      [name, count]
    )
    .then((res) => {
      response.status(200).send(`Hello ${name}`);
    })
    .catch((error) => {
      throw error;
    });
};

const countsRoute = (request, response) => {
  pool
    .query("SELECT name, count FROM names")
    .then((res) => {
      response.status(200).json(res.rows);
    })
    .catch((error) => {
      throw error;
    });
};

const deleteRoute = (request, response) => {
  pool
    .query("DELETE FROM names")
    .then((res) => {
      response.status(200).json(res.rows);
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  helloRoute,
  countsRoute,
  deleteRoute
};
