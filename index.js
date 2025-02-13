import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
let result;
let response;
let type;
let participants;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  type = req.query["type"];
  participants = req.query["participants"];

  try {
    response = await axios.get(`https://apis.scrimba.com/bored/api/activity?type=${type}&participants=${participants}`);
    result = response.data;

    res.render("index.ejs", { 
      data: result 
    });

  } catch (error) {

    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });

  }
});

app.post("/", async (req, res) => {
  type = req.body["type"];
  participants = req.body["participants"];

  try {
    response = await axios.get(`https://apis.scrimba.com/bored/api/activity?type=${type}&participants=${participants}`);
    result = response.data;
    console.log(result)

    if (typeof result.error === 'undefined') {
 
      res.render("index.ejs", { data: result });

    } else{
 
      res.render("index.ejs", {
        error: "There is no activity matching your criteria."})
    }

  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  } 

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
