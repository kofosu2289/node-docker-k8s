require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

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

module.exports = {
  helloRoute,
};
