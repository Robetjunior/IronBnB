const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Reserva = require('../models/Reserva.model')
const mongoose = require('mongoose');
const moment = require('moment')
const passport =require("passport")

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the signup form to users
router.get('/login/create', (req, res) => res.render('auth/signup', {userInSession: req.session.currentUser}));

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
    res
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
        res.status(500).render('auth/signup', { errorMessage: error.message, userInSession: req.session.currentUser });
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', {
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
  // console.log('SESSION =====> ', req.session);
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
// router.get('/userProfile', (req, res) => res.render('users/user-profile'));

// Protegendo rota privada
router.get('/userProfile', async (req, res) => {
  console.log('your sess exp: ', req.session.cookie.expires);

  //VERIFICAR ESSA PARTE
  const findReserv = await Reserva.find().populate("hostId").exec();

  // for(let i=0; i<=findReserv.length; i+=1){
  //   findReserv[i].startDate = moment(findReserv[i].startDate).format('DD/MM/YYYY');
  //   findReserv[i].endDate = moment(findReserv[i].endDate).format('DD/MM/YYYY');
  //   console.log(moment(findReserv[i].startDate).format('DD/MM/YYYY'))
  // }


  console.log(findReserv)
  /////////////////////////

  res.render('users/user-profile', { userInSession: req.session.currentUser, reservas: findReserv});
  // res.render('users/user-profile', { userInSession: req.session.currentUser });
});

router.get("/auth/facebook",
  passport.authenticate("facebook",
    {
      data: [
        {
          "permission": "public_profile",
          "status": "granted"
        }
      ]
    }));

  // one way back from facebook
router.get("/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/test",
    failureRedirect: "/login"
  }),
);


router.get("/test", (req, res) => {
  console.log("testtttt")
  res.redirect("/places")
})

module.exports = router;
