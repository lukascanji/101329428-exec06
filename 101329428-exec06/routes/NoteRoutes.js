const noteModel = require('../models/Notes.js');
//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save



// app.post('/notes', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to save the note
// });

app.post('/notes', async (req, res) => {
    // Validate request
    if(!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    try {
        const note = new noteModel({
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority
        });
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the note."
        });
    }
});


// //TODO - Retrieve all Notes
// //http://mongoosejs.com/docs/api.html#find_find
// app.get('/notes', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to returns all note
// });

app.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find();
        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving notes."
        });
    }
});


// //TODO - Retrieve a single Note with noteId
// //http://mongoosejs.com/docs/api.html#findbyid_findById
// app.get('/notes/:noteId', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to return onlt one note using noteid
// });


app.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.noteId);
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(200).send(note);
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    }
});


// //TODO - Update a Note with noteId
// //http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
// app.put('/notes/:noteId', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to update the note using noteid
// });


app.put('/notes/:noteId', async (req, res) => {
    // Validate Request
    if(!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    try {
        const note = await noteModel.findByIdAndUpdate(req.params.noteId, {
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority,
            dateUpdated: Date.now()
        }, {new: true});
        
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }

        res.status(200).send(note);
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    }
});




// //TODO - Delete a Note with noteId
// //http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
// app.delete('/notes/:noteId', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to delete the note using noteid
// });




app.delete('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findByIdAndRemove(req.params.noteId);
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(200).send({message: "Note deleted successfully!"});
    } catch (error) {
        if(error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    }
});

