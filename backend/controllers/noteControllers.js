const asyncHandler = require('express-async-handler')
const Note = require('../model/noteModal')

// Route:1-- fetching all notes 
const fetchNotes = asyncHandler(async(req,res)=>{
    const note = await Note.find({ user: req.user._id})
    res.status(200).send(note)
})

// Route:2 creating note
const createNote = asyncHandler(async(req,res)=>{
    const {title,content,category} = req.body

    if(!title || !content || !category){
        res.status(401)
        throw new Error('please fill all the fields')
    } else{
        const note = new Note({
            user: req.user._id,
            title,
            content,
            category
        })
        const createdNote = await note.save();
        res.status(200).send(createdNote)
    }
})

// Route:3 finding notes by id
const getNoteById = asyncHandler(async(req,res)=>{
    const note = await Note.findById(req.params.id) //finding particular note with id
    if(note){
        res.status(200).json(note)
    } else{
        res.status(401)
        throw new Error('Note not found')
    }
})

// Route:4 updating notes by id
const updateNote = asyncHandler(async(req,res)=>{
    const {title,content,category} = req.body

    const note = await Note.findById(req.params.id)

    // if the note belongs to the user or not
    if(note.user.toString() !== req.user._id.toString()){
        res.status(400)
        throw new Error('Not Found')
    }
    if(note){
        note.title = title,
        note.content = content,
        note.category = category

        const updatedNote = await note.save();
        res.status(200).json(updatedNote)
    } else{
        res.status(401)
        throw new Error('Note not found')
    }
})

// Route: 5 deleting notes
const deleteNote = asyncHandler(async(req,res)=>{
    const note = await Note.findById(req.params.id)

    if(note.user.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error('Not Found')
    }
    if(note){
        await note.deleteOne();
        res.send({message: 'note removed'})
    } else{
        res.status(401)
        throw new Error('Not Found')
    }
})

module.exports = {fetchNotes,createNote,getNoteById,updateNote,deleteNote}