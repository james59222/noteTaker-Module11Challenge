//Declarations
const express = require('express');
const path = require('path');
const fs = require('fs');

//const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();
const uuid = require('./helpers/uuid');
let Notes = require('./db/db.json');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET * should return the index.html file.
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

//function to create new notes 
app.get('/api/notes',(req,res)=> {
    Notes=JSON.parse(fs.readFileSync('./db/db.json','UTF8'))
    res.json(Notes)
})


//create new notes need to include uuid.
app.post('/api/notes', (req, res) => {
console.info(`${req.method} request received to add a note`);
let newNote={
    title: req.body.title,
    text: req.body.text,
    id: uuid()
}
Notes.push(newNote)
fs.writeFile(
    './db/db.json',
    JSON.stringify(Notes, null, 4),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully updated Notes!')
  );
  res.json(Notes)
});



//delete notes for extra credit.
app.delete('/api/notes/:id',(req,res)=> {
  let keepNotes = []
  for (let i=0;i<Notes.length;i++){
    if (Notes[i].id !=req.params.id){
      keepNotes.push(Notes[i])
    }
  }
Notes=keepNotes 
fs.writeFile(
  './db/db.json',
  JSON.stringify(Notes, null, 4),
  (writeErr) =>
    writeErr
      ? console.error(writeErr)
      : console.info('Successfully updated Notes!')
);
res.json(Notes)
})


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

