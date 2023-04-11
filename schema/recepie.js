const mongoose= require('mongoose')

const recepie= mongoose.Schema({
    name:{
        required: true,
        type: String,
        
    },
    method:{
        required: true,
        type: String
    },
    ingredients:{
        required: true,
        type: Array,
    },
    
    
    
   


});

module.exports= mongoose.model('recepie',recepie);