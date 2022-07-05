const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);


const faSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    dishes:[
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Dish'
      }
    ]
  },{
      timestamps: true
  });


let Favorites = mongoose.model('Favorite', faSchema);

module.exports = Favorites;







