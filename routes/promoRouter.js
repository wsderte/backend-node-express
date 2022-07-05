const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var authenticate = require('../authenticate');

const Promo = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
//.all((req, res, next) => {
 //   res.statusCode = 200;
 //   res.setHeader('Content-Type', 'text/plain');
 //   next();
 // })
  .get((req,res,next) => {
    Promo.find({})
    .then((promo) => {
    //res.end('Will send all the promotions to you!');
       res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    },
     (err) => next(err))
    .catch((err) => next(err));
  })
  .post((req, res, next) => {
  //  if (typeof(authenticate.verifyAdmin(req.user)) != typeof(new Error)){
    Promo.create(req.body)
    .then((promo) => {
      console.log('Promo Created ', promo);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promo);
  }, (err) => next(err))
  .catch((err) => next(err));
//} else{
 /// return next(authenticate.verifyAdmin(req.user));
//}
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
  })
  .delete((req, res, next) => {
   // if (typeof(authenticate.verifyAdmin(req.user)) != typeof(new Error)){
    Promo.remove({})
    .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
}, (err) => next(err))
.catch((err) => next(err)); 
//} else{
 // return next(authenticate.verifyAdmin(req.user));
//}
  });


  
  promoRouter.route('/:promoId')
    .get((req,res,next) => {
      Promo.findById(req.params.promoId)
      .then((promo) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promo);
      }, (err) => next(err))
      .catch((err) => next(err));
    })
    .post((req, res, next) => {
      res.statusCode = 403;
      res.end('POST operation not supported on /promotions/'+
       req.params.promoId);
    })
    .put((req, res, next) => {
    //  if (typeof(authenticate.verifyAdmin(req.user)) != typeof(new Error)){
      Promo.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));

  //} else{
  //  return next(authenticate.verifyAdmin(req.user));
 // }
    })
    .delete((req, res, next) => {
    //  if (typeof(authenticate.verifyAdmin(req.user)) != typeof(new Error)){
      Promo.findByIdAndRemove(req.params.promoId)
      .then((resp) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  //  } else{
   //   return next(authenticate.verifyAdmin(req.user));
   // }
    });


module.exports = promoRouter;

