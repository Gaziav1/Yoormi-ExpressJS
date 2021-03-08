const express = require("express");
const AnimalSubtype = require("../models/animalSubtypes");

const getAnimalSubtypes = (req, res, next) => {
  let animalType = req.query.type;
  AnimalSubtype.find({})
    .then((animalSubtypes) => {
      if (animalSubtypes.length == 0) {
        throw Error("Cannot find animal subtypes");
      }
      res.json({ animalSubtypes })
    })
    .catch((err) => {
      err.statusCode = 404;
      return next(err);
    });
};

module.exports.getAnimalSubtypes = getAnimalSubtypes;
