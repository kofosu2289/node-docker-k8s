const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const os = require("os");
const db = require("./queries");

const app = express();
app.use(morgan('dev'))
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.status(200).send("Node.js, Express, and Postgres API");
});

app.get("/hello/:name", db.helloRoute);

app.get("/counts", db.countsRoute);

app.delete("/counts", db.deleteRoute);

app.get("/health", (request, response) => {
  response.status(200).send({
    os_type: os.type(),
    os_uptime: os.uptime() + "s",
    total_memory: os.totalmem() + " bytes",
    free_memory: os.freemem() + " bytes",
  });
});

app.get("*", (request, response) => {
  const { method, url } = request;
  response.status(404).send(`Endpoint ${method} ${url} Not Found`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
