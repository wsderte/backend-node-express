const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

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

const leaderSchema = new Schema({
    name: {
         type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required:true
    },
    desctiption: [ desctiptionSchema ],
    featured: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

let Leader = mongoose.model('Leader', leaderSchema);

module.exports = Leader;

