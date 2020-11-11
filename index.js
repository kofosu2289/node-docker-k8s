const express = require("express");
const bodyParser = require("body-parser");
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
  response.send("Placeholder for system metrics");
});

app.get("/counts", db.countsRoute);

app.delete('/counts', db.deleteRoute)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
