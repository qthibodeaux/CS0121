const express = require("express");
const helmet = require("helmet");
const bodyParser = require('body-parser');

const port = 4000;

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

require("./controller/route")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
