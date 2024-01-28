const express = require('express'); 
const router = express.Router(); 
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
    res.send(db.testimonials.testimonials);
});


router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length); 
  console.log(randomIndex);
  const randomTestimonial = db.testimonials[randomIndex];
  console.log(randomTestimonial);
  res.status(200).json(randomTestimonial);
});

router.route('/testimonials/:id').get((req, res) => {
  const testimonialId = parseInt(req.params.id);
  console.log(testimonialId);

  const testimonials = db.testimonials.find((testimonial) => testimonial.id === testimonialId);

  if(testimonials) {
    res.status(200).json(testimonials);
  } else {
    res.status(404).json({message: 'Testimonial not found'});
  }
});
 
router.route('/testimonials').post((req, res)  => {
  const { author, text } = req.body;

  const newTestimonial = {
    id: uuidv4(),
    author, 
    text
  };

  db.testimonials.push(newTestimonial);

  console.log(db.testimonials);

  res.status(201).json({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
  const testimonialId = parseInt(req.params.id);

  const { author, text } = req.body;

  console.log('author', author);
  console.log('text', text);
  const testimonial = db.testimonials.find((testimonial) => testimonial.id === testimonialId)

 

  if(testimonial) {
    const testimonialIndex = db.testimonials.indexOf(testimonial);
    console.log(testimonialIndex);
    console.log(db.testimonials);
  
    db.testimonials[testimonialIndex].author = author;  
    db.testimonials[testimonialIndex].text = text;

    res.status(200).json(testimonial);
  } else {
    res.status(404).json({message: 'Testimonial not found'});
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const testimonialId = parseInt(req.params.id);
  // const newTestimonialsArray = db.testimonials.filter(testimonial => testimonial.id !== testimonialId);

  const testimonial = db.testimonials.find((testimonial) => testimonial.id === testimonialId);

  if(testimonialId) {
    const testimonialIndex = db.testimonials.indexOf(testimonial);
    res.status(200).json(testimonial);
    db.testimonials.splice(testimonialIndex, 1);
    console.log(db.testimonials);
  } else {
    res.status(404).json({message: 'Testimonial not found'});
  }
});

module.exports = router;