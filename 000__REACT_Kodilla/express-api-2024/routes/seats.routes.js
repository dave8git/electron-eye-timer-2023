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
  const randomSeat = db.seats[randomIndex];
  res.status(200).json(randomSeat);
});

router.route('/seats/:id').get((req, res) => {
  const seatId = parseInt(req.params.id);

  const seats = db.seats.find((seat) => seat.id === seatId);

  if(seats) {
    res.status(200).json(seats);
  } else {
    res.status(404).json({message: 'Seat not found'});
  }
});
 
router.route('/seats').post((req, res)  => {
  const { day, seat, client, email } = req.body;

  const newSeat = {
    id: uuidv4(),
    day, 
    seat,
    client, 
    email
  };

  db.seats.push(newSeat);

  console.log(db.seats);

  res.status(201).json({message: 'OK'});
});

router.route('/seats/:id').put((req, res) => {
  const seatId = parseInt(req.params.id);

  const { day, seat, client, email } = req.body;


  const seatSelected = db.seats.find((seat) => seat.id === seatId)

 

  if(seatSelected) {
    const seatIndex = db.seats.indexOf(seatSelected);
  
    db.seats[seatIndex].day = day;  
    db.seats[seatIndex].seat = seat;
    db.seats[seatIndex].client = client; 
    db.seats[seatIndex].email = email;

    res.status(200).json(seatSelected);
  } else {
    res.status(404).json({message: 'Seat not found'});
  }
});

router.route('/seats/:id').delete((req, res) => {
  const seatId = parseInt(req.params.id);
  // const newseatsArray = db.seats.filter(testimonial => testimonial.id !== testimonialId);

  const seat = db.seats.find((seat) => seat.id === seatId);

  if(seatId) {
    const seatIndex = db.seats.indexOf(seat);
    res.status(200).json(seat);
    db.seats.splice(seatIndex, 1);
    console.log(db.seats);
  } else {
    res.status(404).json({message: 'Seat not found'});
  }
});

module.exports = router;