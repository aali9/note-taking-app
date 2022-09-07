const router = require ('express').Router();
const fs = require("fs");
const uuid = require("uuid");

router.get('/notes', (req, res) => {
  fs.readFile('db/db.json', "utf8", (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

router.post('/notes', (req, res) => {
  fs.readFile('db/db.json', "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNote = {
        id: notes.length + 1,
        title: req.body.title,
        text: req.body.text
    }
    notes.push(newNote);
    fs.writeFile('db/db.json', JSON.stringify(notes), (err, data) => {
        if (err) throw err;
        res.end(data)
    });
});
});

router.delete('/notes/:id', (req, res) => {
  console.log(typeof req.params.id);
  fs.readFile('db/db.json', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      const newNotes = notes.filter(note => note.id != req.params.id)
      fs.writeFile('db/db.json', JSON.stringify(newNotes), (err, data) => {
          if (err) throw err;
          res.end(data)
      })
  })})



module.exports = router;