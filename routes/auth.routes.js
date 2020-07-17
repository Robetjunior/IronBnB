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


const HostModel = require('../models/Host.model');

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
  const newArr = []

  for(let item of findReserv){
    const formatedStartDate = moment(item.startDate).format('DD/MM/YYYY')
    const formatedEndDate = moment(item.endDate).format('DD/MM/YYYY')
    newArr.push({...item._doc, startDate: formatedStartDate, endDate: formatedEndDate})
  }

  res.render('users/user-profile', { userInSession: req.session.currentUser, reservas: newArr});
});



////////////////////////////////////////////////////////////////////////
////////////////////GERENCIANDO HOSTS///////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get('/host', async (req, res) => {
  //verificar se  tem host criado pelo o usuario logado e apresentar na tela 
  const hosts = await HostModel.find({"ownerId": req.session.currentUser._id});
  console.log(hosts)
  res.render('hoster/managment-host', {userInSession: req.session.currentUser, hosts})
});


////////////////////////////////////////////////////////////////////////
////////////////////////CRIANDO HOSTS///////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get('/host/create', async(req, res) => res.render('hoster/new-host', {userInSession: req.session.currentUser}))


router.post('/host/create', fileUploader.single("imgPath"), (req,res) => {
    const { local, title, espaco, qntHosp, preco } = req.body;


    HostModel.create({local, title, espaco, qntHosp, preco, imgPath: req.file.url, ownerId: req.session.currentUser._id})
      .then((data)=>{
        console.log(data);
        res.redirect('/host');
      })
      .catch((err)=>
        console.error(`Error while creating a new host: ${err}`)
    );
});
//req.session.currentUser


module.exports = router;