const express = require('express'); 
const router = express.Router(); 
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
    res.send(db.seats);
});


router.route('/seats/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.seats.length); 
  console.log(randomIndex);
  const randomTestimonial = db.seats[randomIndex];
  console.log(randomTestimonial);
  res.status(200).json(randomTestimonial);
});

router.route('/seats/:id').get((req, res) => {
  const testimonialId = parseInt(req.params.id);
  console.log(testimonialId);

  const seats = db.seats.find((testimonial) => testimonial.id === testimonialId);

  if(seats) {
    res.status(200).json(seats);
  } else {
    res.status(404).json({message: 'Testimonial not found'});
  }
});
 
router.route('/seats').post((req, res)  => {
  const { author, text } = req.body;

  const newTestimonial = {
    id: uuidv4(),
    author, 
    text
  };

  db.seats.push(newTestimonial);

  console.log(db.seats);

  res.status(201).json({message: 'OK'});
});

router.route('/seats/:id').put((req, res) => {
  const testimonialId = parseInt(req.params.id);

  const { author, text } = req.body;

  console.log('author', author);
  console.log('text', text);
  const testimonial = db.seats.find((testimonial) => testimonial.id === testimonialId)

 

  if(testimonial) {
    const testimonialIndex = db.seats.indexOf(testimonial);
    console.log(testimonialIndex);
    console.log(db.seats);
  
    db.seats[testimonialIndex].author = author;  
    db.seats[testimonialIndex].text = text;

    res.status(200).json(testimonial);
  } else {
    res.status(404).json({message: 'Testimonial not found'});
  }
});

router.route('/seats/:id').delete((req, res) => {
  const testimonialId = parseInt(req.params.id);
  // const newseatsArray = db.seats.filter(testimonial => testimonial.id !== testimonialId);

  const testimonial = db.seats.find((testimonial) => testimonial.id === testimonialId);

  if(testimonialId) {
    const testimonialIndex = db.seats.indexOf(testimonial);
    res.status(200).json(testimonial);
    db.seats.splice(testimonialIndex, 1);
    console.log(db.seats);
  } else {
    res.status(404).json({message: 'Testimonial not found'});
  }
});

module.exports = router;