const express = require("express");
const bodyParser = require("body-parser");
const serveIndex = require("serve-index");
const path = require("path");

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var lecturePath = path.join(__dirname, "lectures", "src");
app.use(
  "/",
  express.static(lecturePath),
  serveIndex(lecturePath, { icons: true, stylesheet: "./styles/custom.css" })
);

// app.use(
//   "/files",
//   express.static("public"),
//   serveIndex("public", { icons: true, stylesheet: "./styles/custom.css" })
// );

// app.get('/', (req, res) => {
//   res.sendFile('index.html', { root: __dirname + '/public' });
// });
var port = process.env.PORT || 3000;

app.listen(port);
