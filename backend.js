var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;

var cors = require("cors");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile("/index.html");
});

app.post("/log", function (req, res) {
  const data = req.body
  if (data)
  
  res.end();
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
