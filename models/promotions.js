const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const desctiptionSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author: {
        type: String,
        require: true
    }
},{
    timestamps: true
});

const promotionSchema = new Schema({
    name: {
         type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required:true
    },
    price: {
        type: Currency,
        min: 1,
        required: true
    },
    desctiption: [ desctiptionSchema ],
    featured: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

let Promo = mongoose.model('Promo', promotionSchema);

module.exports = Promo;
