const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all notes using GET '/api/auth/fetchallnotes'  LOGIN REQUIRED
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });

        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }


})

//ROUTE 2: Add a new note using GET '/api/auth/addnote'  LOGIN REQUIRED
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 3 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        /*  const notes=await Notes.find({user:req.user.id}); */
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id

        })

        const savedNote = await note.save()


        res.json(savedNote);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }


})



//ROUTE 3:  Update new note using PUT '/api/auth/updatenote'  LOGIN REQUIRED
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        //fetching details from request
        const { title, description, tag } = req.body;

        //Create a new note object
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).json({ msg: 'Note not found' }) }


        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }



        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, newNote, { new: true });
        res.json(updatedNote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


//ROUTE 4: Delete a note using DELETE '/api/auth/updatenote'  LOGIN REQUIRED
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //fetching details from request
        const { title, description, tag } = req.body;

        //Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).json({ msg: 'Note not found' }) }

        //allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }



        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ 'Success': "Note deleted successfully", "note": note });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})




module.exports = router;


