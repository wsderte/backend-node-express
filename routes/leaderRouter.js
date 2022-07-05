const express    = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var authenticate = require('../authenticate');

const Leader = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
  .get((req,res,next) => {
    Leader.find({})
    .then((leader) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err))
  })
  .post((req, res, next) => {
  //  if (typeof(authenticate.verifyAdmin(req.user)) != typeof(new Error)){
    Leader.create(req.body)
    .then((leader) => {
      console.log('Leader Created ', leader);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err))
  //} else{
  //  return next(authenticate.verifyAdmin(req.user));
 // }
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
  })
  .delete((req, res, next) => {
//    if (typeof(authenticate.verifyAdmin(req.user)) != typeof(new Error)){
    Leader.remove({})
    .then((resp) =>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err)); 
//} else{
///  return next(authenticate.verifyAdmin(req.user));
//}
  });


  
leaderRouter.route('/:leaderId')
    .get((req,res,next) => {
        Leader.findById(req.params.leaderId)
        .then((leader) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', "application/json");
          res.json(leader);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post((req, res, next) => {
      res.statusCode = 403;
      res.end('POST operation not supported on /leaders/'+
       req.params.leaderId);
    })
    .put((req, res, next) => {
     // if (typeof(authenticate.verifyAdmin(req.user)) != typeof(new Error)){
      Leader.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
//  } else{
///    return next(authenticate.verifyAdmin(req.user));
//  }
    })
    .delete((req, res, next) => {
  //    if (typeof(authenticate.verifyAdmin(req.user)) != typeof(new Error)){
      Leader.findByIdAndRemove(req.params.leaderId)
      .then((resp) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
 //   } else{
 //     return next(authenticate.verifyAdmin(req.user));
 //   }
    });

module.exports = leaderRouter;

