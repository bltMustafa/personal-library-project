const express = require("express");
const apicache = require("apicache");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 2080;

const cache = apicache.middleware;

const v1UserRouter = require("./v1/routes/userRoutes");
app.use(cache("0 seconds"));

app.use(cors());

app.get("/api/v1/users", (req, res) => {
  try {
    const DB = require("./database/db.json");
    const formattedJson = JSON.stringify(DB, null, 2);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(formattedJson);
  } catch (error) {
    res
      .status(500)
      .json({ error: "JSON data could not be retrieved or parsed." });
  }
});
app.use(bodyParser.json());
app.use("/api/v1/users", v1UserRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
