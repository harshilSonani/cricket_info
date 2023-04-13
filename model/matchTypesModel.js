const mongoose = require('mongoose')

const matchSchema = mongoose.Schema({
    mtype : {
        type : String,
        required : true
    }
});

const match = mongoose.model('match types data', matchSchema);
module.exports = match;