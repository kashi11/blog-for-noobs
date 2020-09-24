const { json } = require("body-parser");
const { Router } = require("express");
var express = require("express");
const { ObjectID } = require("mongodb");
var router = express.Router();
var postModel = require("../models/post");

/* GET users listing. */
router.get("/", function (req, res, next) {
  var skips = parseInt(req.query.skip);
  var limits = parseInt(req.query.limit);
  console.log()
  postModel
    .find({},function(err,user){  
      res.send(user)  
    })
    .skip(skips)
    .limit(limits)
});
router.post("/", function (req, res, next) {
  var post = new postModel(req.body);
  post
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(req.body);

  res.send("suuuuuccccesss");
});
router.get("/id/",function(req,res,next){
  var id=ObjectID(req.query.id);
  postModel.find(id
  ,(err,post)=>{
    res.send(post);
  })
});
module.exports = router;
