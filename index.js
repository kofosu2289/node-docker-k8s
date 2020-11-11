const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");
const db = require("./queries");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.send("Node.js, Express, and Postgres API");
});

app.get("/hello/:name", db.helloRoute);

app.get("/health", (request, response) => {
  response.status(200).send({
    os_type: os.type(),
    os_uptime: os.uptime() + "s",
    total_memory: os.totalmem() + " bytes",
    free_memory: os.freemem() + " bytes"
  });
});

app.get("/counts", db.countsRoute);

app.delete("/counts", db.deleteRoute);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
