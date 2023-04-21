const express = require('express');
const path = require('path');
const fs = require('fs');
//const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();
const uuid = require('./helpers/uuid');
const Notes = require('./db/db.json');

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
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//function to create new notes 


fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNOTES = JSON.parse(data);

      // Add a new review
      parsedNOTES.push();


fs.writeFile(
    './db/db.json',
    JSON.stringify(Notes, null, 4),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully updated Notes!')
  );
}
});
//create new notes need to include uuid.
app.post('/api/notes', (req, res) => {
console.info(`${req.method} request received to add a note`);

});


//read notes

//delete notes for extra credit.



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

