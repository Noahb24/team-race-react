const express = require("express");
const dbo = require('../db/conn')
const router = express.Router();


router.get("/queryposts",async (req, res) => {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("main_posts")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching posts");
     } else {
        res.json(result);
      }
    });
});

router.post('/newPost', async (req,res) => {
  const newPost = {
    name: req.body.name,
    date: new Date(),
    content: req.body.content
  }

  console.log(newPost)

  const dbConnect = dbo.getDb();

  dbConnect
    .collection("main_posts")
    .insertOne(newPost, function (err, result) {
      if (err) {
        res.status(400).send("Error Posting");
     } else {
        res.status(204).send();
      }
    });
})

module.exports = router;
