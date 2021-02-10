const express = require('express');
const router = express.Router();
const User=require('../models/User.model')
const bcrypt=require('bcryptjs')
//get the register form
router.get('/register', (req, res)=>{
    res.render('register')
})

//to login-> route &view
router.get('/login', (req, res)=>{
    res.render('login')
  })

//post login info which will 'survive' the present operation only if we add sessions& session stores (session middleware) 

router.post('/login', (req, res)=>{
    console.log('SESSION =====> ', req.session);
    const username = req.body.username;
    const password=req.body.password;
    if(username ==='' || password === ''){
        res.render('login', {errorMessage: 'Please enter both your credentials to access your account'})
    }
//find in DB and validate with conditionals: whether null, and if not, check the password BCRYPT!
    User.findOne({username:username}).then(userDB=>{
        if(userDB === null){
            res.render('login', {errorMessage: 'Your credentials do not match'})
            return
        }if(bcrypt.compareSync(password, userDB.password)){
            console.log(userDB)
            //protected route:
            // 1. SAVE THE USER IN THE SESSION===>it's the user from the DB;
            // 2. redirect to his profile route
            req.session.user = userDB
            res.redirect('/main')
        }
        else{
            res.render('login', {errorMessage: 'Please enter a valid password'})
        }
    }).catch(err=>console.log('Something went wrong',err))
})
//=> CONFIGURATION: sessions in the main file


//establish the connection the Backend, i.e. POST it
 router.post('/register', (req, res)=>{
     const username=req.body.username;
     const password=req.body.password;
     console.log(username, password)
     //PASSWORD and USERNAME VALIDATION(preDB): length
     if(password.length<8){
         res.render('register', {errorMessage: 'Your password should be at least 8 characters long'})
         return
     }if(username === ''|| password === ''){
         res.render('register', {errorMessage: 'You left the username or password field empty'})
         return
     } //if the user if ok, find it in the DB w/ query
     User.findOne({username: username}).then(userDB=>{
         //further username validation in DB=> does the username already exist?
         if (userDB !== null){
             res.render('/register', {errorMessage: 'This username is taken'})
             return
         }
         else{
            //create USER with salted and hashed password
            const salt = bcrypt.genSaltSync()
            const hash=bcrypt.hashSync(password, salt) 
            User.create({username: username, password: hash}).then(userNewDB=>{
                console.log(userDB)
                res.render('index', {errorMessage: 'You now have an account'});
            })
         }

     }).catch(err=>{console.log('Something went wrong', err)})
 })

//protected route!





module.exports = router;

 
 
 