const express = require("express");
const JWT_SECRET = "param is a very good boy "
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
// Route 1 get note of user : get/api/note/getAllNote
router.get("/getnote", fetchuser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// Route 2 add note of user : get/api/note/addnote
router.post(
  "/addnote",fetchuser,
  [
    body("title", "Enter a valid title ").isLength({ min: 3 }),
    body("description", "description should be minimum 3 characters  ").isLength(
      { min: 3 }
    ),
    body("tag", "tag is empty ").isLength({ min: 1 }),
  ],
  async (req, res) => { 
    // console.log("User from fetchuser middleware:", req.user);
    try {   
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error occured ");
    }
  }
);

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
      // Create a newNote object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      // Find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
