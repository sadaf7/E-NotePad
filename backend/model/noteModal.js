const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User3',
        required: true
    }
},
    {
        timeStamps: true
    }
)

const Note = mongoose.model('Note',noteSchema)
module.exports = Note;