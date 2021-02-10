const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));



router.get('/main', (req, res)=>{
    res.render('profile', {userDB: req.session.user})
})


router.get('/main', (req, res)=>{
    res.render('profile', {userDB: req.session.user})
})

router.get('/private', (req, res)=>{
    res.render('private', {userDB: req.session.user})
})


module.exports = router;
