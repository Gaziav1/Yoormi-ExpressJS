const express = require("express");
const { Mongoose } = require("mongoose");
const Ad = require("../models/ad");
const Animal = require("../models/animal");

const getAds = (req, res, next) => { 
    Ad.find({})
    .populate({ path: 'ownerId', select: 'name image'  })
    .populate({ path: 'animalId', select: '-ownerId -__v'  })
    .select("-__v")
    .then(animals => { 
       res.json(animals)
    })
    .catch(error => { 
        error.message = "Cannot found resource"
        error.statusCode = 404
        next(error)
    })
}

const postSaveAnimalAndAd = (req, res, next) => {
  let imageURLs = req.files.images.map((item) => item.path);
  let name = req.body.name;
  let animalType = req.body.animalType;
  let age = parseInt(req.body.age);
  let isMale = req.body.isMale == "true";
  let animalSubtype = req.body.animalSubType
  let ownerId = req.user;

  if (!ownerId) {
    let error = Error("Permission denied");
    error.statusCode = 401;
    return next(error);
  }

  const animal = new Animal({
    name,
    animalType,
    age,
    isMale,
    animalSubtype,
    ownerId,
    imageURLs,
  });
  animal
    .save()
    .then((animal) => {
        return saveAdFromAnimal(animal, req)
    })
    .then(ad => { 
        res.json({ message: "Successfully created an ad" })
    })
    .catch((error) => {
      error.statusCode = 409;
      error.message = "Couldn't create an animal model";
      next(error);
    });
};

function saveAdFromAnimal(animal, req) { 
    let animalId = animal._id
    let ownerId = animal.ownerId
    let address = { lat: req.body.lat, long: req.body.long }
    let text = req.body.text
    let price = parseInt(req.body.price)
    let isReadyForSale = req.body.isReadyForSale == "true"

    let ad = new Ad({ animalId, ownerId, address, text, price, isReadyForSale })

    return ad.save()
}

module.exports.postSaveAnimalAndAd = postSaveAnimalAndAd;
module.exports.getAds = getAds;
