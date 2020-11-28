const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// test routing

router.get("/hello", (req, res) => {
  res.send("Hello routing");
});

//Create and Save a Record of a Model:
// @post method
//@desc post a new person
//@path : http://localhost:5000/api/person/
//params : body

router.post("/", async (req, res) => {
  try {
    const newperson = new Person(req.body);
    const response = await newperson.save();
    res.send({ response: response, msg: "user is saved" });
  } catch (error) {
    console.log(error);
    res.status(400).send("can not save it");
  }
});

//Create Many Records with model.create()
// @post method
//@desc post a many person
//@path : http://localhost:5000/api/person/
//params : body

router.post("/", async (req, res) => {
  try {
    const newpersons = await new Person(req.body, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });

    res.statuts(200).json({ response: newpersons, msg: "users are saved" });
  } catch (error) {
    console.log(error);
    res.status(400).send("can not save users");
  }
});

//Use model.find() to Search Your Database
// @get method
//@desc get all persons
//@path : http://localhost:5000/api/person/
//params :

router.get("/", async (req, res) => {
  try {
    const getallpersons = await Person.find();
    res.status(200).json(getallpersons);
  } catch (e) {
    res.status(404).json({ message: err });
  }
});

//Find just one person which has a certain food in the person's favorites
//@get method
//@desc find person  by food  as search key.
////@path : http://localhost:5000/api/person/
//params: foods

router.get("/:favoriteFoods", (req, res) => {
  Person.findOne({ favoriteFoods: req.params.favoriteFoods }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(data);
    }
  });
});

//Find the (only!!) person having a given _id, using Model.findById()
//@get method
//@desc find person  by id  as search key.
////@path : http://localhost:5000/api/person/:id
//params: id

router.get("/:id", (req, res) => {
  Person.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
      res.send({ msg: "hhhh" });
    } else {
      res.status(200).json(data);
    }
  });
});

//find person by id and remove
//@method delete

//path :////@path : http://localhost:5000/api/person/:id

router.post("/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = router;
