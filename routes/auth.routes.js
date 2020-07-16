const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Reserva = require('../models/Reserva.model')
const mongoose = require('mongoose');
const moment = require('moment')
const passport =require("passport")

// Instancia do Multer/Cloudnary
const fileUploader = require('../configs/cloudnary.config');

//funcao formatar data
const dateFormaterYear = (s) => {
  const newArr = s.toString().split(" ");

  let year = newArr[3];
  let day = newArr[2];
  let month = newArr[1];
  
  return `${day}/${month}/${year}`;
}; 


////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the signup form to users
router.get('/login/create ', (req, res) => res.render('auth/login', {userInSession: req.session.currentUser}));

// .post() route ==> to process form data
router.post('/login/create', (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.', userInSession: req.session.currentUser });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    resdateFormaterYear
      .status(500)
      .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.', userInSession: req.session.currentUser });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        // username: username
        username,
        email,
        passwordHash: hashedPassword
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/login');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/login', { errorMessage: error.message, userInSession: req.session.currentUser });
      } else if (error.code === 11000) {
        res.status(500).render('auth/login', {
          errorMessage: 'Username and email need to be unique. Either username or email is already used.', userInSession: req.session.currentUser
        });
      } else {
        next(error);
      }
    }); // close .catch()
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGIN ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the login form to users
router.get('/login', (req, res) => res.render('auth/login', {userInSession: req.session.currentUser}));

// .post() login route ==> to process form data
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.', userInSession: req.session.currentUser
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.', userInSession: req.session.currentUser });
        return;
      }
      bcryptjs
        .compare(password, user.passwordHash)
        .then(success => {
          if (success) {
            //******* SAVE THE USER IN THE SESSION ********//
            req.session.currentUser = user;
            return res.redirect('/userProfile');
          }
          res.render('auth/login', { errorMessage: 'Incorrect password.', userInSession: req.session.currentUser });
        })
        .catch(err => {
          throw new Error(err);
        });
    })
    .catch(error => next(error));
});


////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGOUT ////////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

////////////////////////////////////////////////////////////////////////
////////////////////PROTEGENDO ROTA PRIVADA/////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get('/userProfile', async (req, res) => {
  console.log('your sess exp: ', req.session.cookie.expires);

  //VERIFICAR ESSA PARTE
  const findReserv = await Reserva.find().populate("hostId").exec();
  // const startDateFormated = findReserv.map(reserva=> {
  //   return reserva.startDate = dateFormaterYear(reserva.startDate);   
  // })

  // const endDateFormated = findReserv.map(reserva=> {
  //   return reserva.endDate = dateFormaterYear(reserva.endDate);   
  // })
  res.render('users/user-profile', { userInSession: req.session.currentUser, reservas: findReserv});
});

module.exports = router;