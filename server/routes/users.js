const { json } = require("body-parser");
var express = require("express");
const { model } = require("../models/user");
var router = express.Router();
var userModel = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  userModel.findOne(
    {
      $and: [
        {
          username: req.query.username,
        },
        { password: req.query.password },
      ],
    },
    (err, user) => {
      console.log(user);
      if (user !== null) {
        res.send("success");
      } else {
        res.send("fail");
      }
    }
  );
});
//
//Post Method
//
router.post("/", function (req, res, next) {
  var user = new userModel(req.body);
  userModel.findOne(
    {
      username: req.body.username,
    },
    (err, user) => {
      console.log(user);
      if (user !== null) {
        res.send("fail");
      } else {
        userModel(req.body)
          .save()
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
          res.send("success");
      }
    }
  );
});

module.exports = router;
