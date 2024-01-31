const express = require('express'); 
const router = express.Router(); 
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
    res.send(db.concerts);
});


router.route('/concerts/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.concerts.length); 
  const randomConcert = db.concerts[randomIndex];
  console.log(randomConcert);
  res.status(200).json(randomConcert);
});

router.route('/concerts/:id').get((req, res) => {
  const concertId = parseInt(req.params.id);
  console.log(concertId);

  const concerts = db.concerts.find((concert) => concert.id === concertId);

  if(concerts) {
    res.status(200).json(concerts);
  } else {
    res.status(404).json({message: 'Concert not found'});
  }
});
 
router.route('/concerts').post((req, res)  => {
  const { performer, genre, price, day, image } = req.body;

  const newConcert = {
    id: uuidv4(),
    performer, 
    genre,
    price,
    day,
    image
  };

  db.concerts.push(newConcert);

  console.log(db.concerts);

  res.status(201).json({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
  const concertId = parseInt(req.params.id);

  const { performer, genre, price, day, image } = req.body;

  console.log('author', author);
  console.log('text', text);
  const concert = db.concerts.find((concert) => concert.id === concertId)

 

  if(concert) {
    const concertIndex = db.concerts.indexOf(concert);
    console.log(concertIndex);
    console.log(db.concerts);
  
    db.concerts[concertIndex].performer = performer;  
    db.concerts[concertIndex].genre = genre;
    db.concerts[concertIndex].price = price; 
    db.concerts[concertIndex].day = day; 
    db.concerts[concertIndex].image = image; 

    res.status(200).json(concert);
  } else {
    res.status(404).json({message: 'Concert not found'});
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const concertId = parseInt(req.params.id);
  // const newconcertsArray = db.concerts.filter(testimonial => testimonial.id !== testimonialId);

  const concertFound = db.concerts.find((concert) => concert.id === concertId);

  if(concertId) {
    const concertIndex = db.concerts.indexOf(concertFound);
    res.status(200).json(concert);
    db.concerts.splice(concertIndex, 1);
    console.log(db.concerts);
  } else {
    res.status(404).json({message: 'Concert not found'});
  }
});

module.exports = router;