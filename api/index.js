const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

const postRouter = require('./routes/posts')

app.use(cors({
  origin:  ["http://localhost:3000"],
  credentials: true,
  methods:['GET', 'PUT','POST'],
  allowedHeaders: 'Content-Type,Authorization,cookie',
  preflightContinue: true
}))

app.use(express.json());


app.use("/api/posts", postRouter);

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
