const express = reqire('express')
const router = express.Router(); 
const db = require('../../db');

// router.get('/', (req, res) => {
//     res.send()
// })

// get all posts
router.route('/posts').get((req, res) => {
    res.json(db.posts);
});

/* ... */ 

module.exports = router; 