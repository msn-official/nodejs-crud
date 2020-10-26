const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema({
    id : Number,
    name : String
},{
    timestamps : true
}); 

module.exports = mongoose.model('Hero',HeroSchema,'heroes');