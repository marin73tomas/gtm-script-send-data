var express = require("express");
var app = express();
const {
  DynamoDBClient,
  ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");
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
  console.log(`storing ${data} in DynamoDB`)
  if (data){
    // (async () => {
    //   const client = new DynamoDBClient({ region: "us-west-2" });
    //   const command = new ListTablesCommand({});
    //   try {
    //     const results = await client.send(command);
    //     console.log(results.TableNames.join("\n"));
    //   } catch (err) {
    //     console.error(err);
    //   }
    // })();
  }
  
  res.end();
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
