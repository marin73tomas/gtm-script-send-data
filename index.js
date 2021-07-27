var express = require("express");
var app = express();
const axios = require('axios')
const PORT = process.env.PORT || 3000;

var cors = require("cors");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile("/index.html");
});

app.post("/analytic", async function (req, res) {
  const data = JSON.stringify(req.body);
  data || console.log('that has been an error with the analytic data')
  if (data) {
    console.log(data)
    try{
    const res = await axios.post('http://pixel-tracker.sarrix.net/store', data
    )
  }catch(error){
    console.log(error)
  }
  }


  res.end();
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
