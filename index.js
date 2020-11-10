const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.get("/", (request, response) => {
  response.send( "Node.js, Express, and Postgres API" );
});

app.get("/hello/:name", (request, response) => {
  response.send( `Hello ${request.params.name}!` );
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
