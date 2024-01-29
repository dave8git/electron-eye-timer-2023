const express = require('express'); 
const router = express.Router(); 
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
    res.send(db.concerts);
});


router.route('/concerts/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.concerts.length); 
  console.log(randomIndex);
  const randomTestimonial = db.concerts[randomIndex];
  console.log(randomTestimonial);
  res.status(200).json(randomTestimonial);
});

router.route('/concerts/:id').get((req, res) => {
  const testimonialId = parseInt(req.params.id);
  console.log(testimonialId);

  const concerts = db.concerts.find((testimonial) => testimonial.id === testimonialId);

  if(concerts) {
    res.status(200).json(concerts);
  } else {
    res.status(404).json({message: 'Testimonial not found'});
  }
});
 
router.route('/concerts').post((req, res)  => {
  const { author, text } = req.body;

  const newTestimonial = {
    id: uuidv4(),
    author, 
    text
  };

  db.concerts.push(newTestimonial);

  console.log(db.concerts);

  res.status(201).json({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
  const testimonialId = parseInt(req.params.id);

  const { author, text } = req.body;

  console.log('author', author);
  console.log('text', text);
  const testimonial = db.concerts.find((testimonial) => testimonial.id === testimonialId)

 

  if(testimonial) {
    const testimonialIndex = db.concerts.indexOf(testimonial);
    console.log(testimonialIndex);
    console.log(db.concerts);
  
    db.concerts[testimonialIndex].author = author;  
    db.concerts[testimonialIndex].text = text;

    res.status(200).json(testimonial);
  } else {
    res.status(404).json({message: 'Testimonial not found'});
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const testimonialId = parseInt(req.params.id);
  // const newconcertsArray = db.concerts.filter(testimonial => testimonial.id !== testimonialId);

  const testimonial = db.concerts.find((testimonial) => testimonial.id === testimonialId);

  if(testimonialId) {
    const testimonialIndex = db.concerts.indexOf(testimonial);
    res.status(200).json(testimonial);
    db.concerts.splice(testimonialIndex, 1);
    console.log(db.concerts);
  } else {
    res.status(404).json({message: 'Testimonial not found'});
  }
});

module.exports = router;