const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdatedconst mongoose = require('mongoose');

const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true,
        trim: true,
    },
    noteDescription: {
        type: String,
        required: true,
        trim: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ['HIGH', 'LOW', 'MEDIUM'],
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    },
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
