const express = require('express');
const { fetchNotes, createNote, getNoteById, updateNote, deleteNote } = require('../controllers/noteControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router()

// ROUTE: 1 -- fetching all notes of loggedIn user
router.route('/').get(protect,fetchNotes)

// ROUTE: 2 -- creating notes of loggedIn user
router.route('/create').post(protect,createNote)

// ROUTE: 3 -- finding notes by notes _Id of loggedIn user
router.route('/:id').get(protect,getNoteById)

// ROUTE: 4 -- updating notes by notes _Id of loggedIn user
router.route('/:id').put(protect,updateNote)

// ROUTE: 5 -- deleting notes by notes _Id of loggedIn user
router.route('/:id').delete(protect,deleteNote)



module.exports = router;