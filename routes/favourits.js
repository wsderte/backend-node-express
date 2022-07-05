const express    = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites = require('../models/favorite');

const e = require('express');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/',)
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser,(req,res,next) => {
    Favorites.find({})
    .populate('user')
    .populate('dishes')
    .then((favorite) =>{
        var user;
        if(favorite){
            user = favorite.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
            if(!user){
                var err = new Error("You have no favourites!");
                err.status = 404;
                return next(err);
            }
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(user);
        }
        else{
            var err = new Error('There are no favourites');
            err.status = 404;
            return next(err);
        }
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({})
    .populate('user')
    .populate('dishes')
    .then((favorite) => {
        var user;
        if(favorite){
            user = favorite.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
        }
        if(!user){
            user = new Favorites({user: req.user.id});
        }
        for(let i in req.body){
            if(user.dishes.find((dish_id) => {
                if(dish_id._id){
                    return dish_id._id.toString() === i._id.toString();
                }
            }))
            continue;
            user.dishes.push(i._id);
        }
        user.save()
        .then((favorite) => {
            console.log('Favorite created',favorite);
            res.statusCode = 201;
            res.setHeader('Content-Type','application/json');
            res.end(favorite);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /favourites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res, next) => {
    Favorites.find({})
    .populate('user')
    .populate('dishes')
    .then((favorite) => {
        var favRemove;
        if(favorite){
            favRemove = favorite.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
        }
        if(favRemove){
            favRemove.remove()
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            },(err) => next(err));
        }
        else{
            var err = new Error('You do not have any favourites');
            err.status = 404;
            return next(err);
        }
    },(err) => next(err))
    .catch((err) => next(err));
});

favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res, next) => {
    Favorites.find({})
    .populate('user')
    .populate('dishes')
    .then((favorite) => {
        if(favorite){
            const favs = favorite.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
            const dish = favorite.dishes.filter(dish => dish.id === req.params.dishId)[0];
            if(dish){
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            }
            else{
                var err = new Error('You do not have dish ' + req.params.dishId);
                err.status = 404;
                return next(err);
            }
        }
        else{
            var err = new Error('You do not have any favourites');
            err.status = 404;
            return next(err);
        }
        
    },(err) => next(err))
    .catch((err) => next(err));

})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res,next) => {
    Favorites.find({})
    .populate('user')
    .populate('dishes')
    .then((favorite) => {
        var user;
        if(favorite){
            user = favorite.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
        }
        if(!user){
            user = new Favorites({user: req.user.id});
        }
        if(!user.dishes.find((dish_id) => {
            if(dish_id._id){
                return dish_id._id.toString() === req.params.dishId.toString();
            }
        }))
        user.dishes.push(req.params.dishId);

        user.save()
        .then((userFav) => {
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.json(userFav);
            console.log("Favourites Created");
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /favourites/:dishId');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favourites.find({})
        .populate('user')
        .populate('dishes')
        .then((favourites) => {
            var user;
            if(favourites)
                user = favourites.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
            if(user){
                user.dishes = user.dishes.filter((dishid) => dishid._id.toString() !== req.params.dishId);
                user.save()
                    .then((result) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(result);
                    }, (err) => next(err));
                
            } else {
                var err = new Error('You do not have any favourites');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = favoriteRouter;





