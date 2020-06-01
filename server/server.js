const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');
const config = require('./DB.js');
const jwt = require('jsonwebtoken');
const PORT = 4000;

const passport = require('passport')
const session = require('express-session')
var cookieParser = require('cookie-parser');

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function jwtVerify(req,res,next) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    jwt.verify(req.token, process.env.AUTH_KEY, err => {
      if(err)
        res.sendStatus(401).send("Unauthorized access")
      else
        next()
    })
  } else {
    res.sendStatus(401)
  }
}

function casVerify(req,res,next) {
  passport.authenticate('cas', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.session.messages = info.message;
      return res.sendStatus(401).send("Unauthorized");
    }
    req.session.messages = '';
    return res.send(user)
  })(req, res, next);
}

// get environment variabless when not in production
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: path.resolve(__dirname, '../variables.env') })

// ensure auth key is available in environment
if(!process.env.AUTH_KEY){
  res.status(500).send("Error")
  console.log("No auth key")
  return
}

// const authRouter = require('./Auth/Auth.route')
const userRouter = require('./User/User.route')
const courseRouter = require('./Course/Course.route')
const sectionRouter = require('./Section/Section.route')
const eventRouter = require('./Event/Event.route')
const submissionRouter = require('./Submission/Submission.route')
const lectureRouter = require('./Lecture/Lecture.route')
const lectureSubmissionRouter = require('./LectureSubmission/LectureSubmission.route')
const pollRouter = require('./PlaybackPoll/PlaybackPoll.route')


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

// const MongoStore = require('connect-mongo')(session);

app.use(cors({ origin:['http://localhost:8080'],
    methods:['GET','POST'],
    credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
// Configure session store (memory)
app.use(session({
  secret: 'stackoverflow_didnt_even_help',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

let User = require('./User/User.model');

passport.use(new (require('passport-cas').Strategy)({
  version: 'CAS3.0',
  ssoBaseURL: 'https://cas-auth.rpi.edu/cas',
  serverBaseURL: 'http://localhost:4000'
}, function(profile, done) {
  var login = profile.user;
  User.findOne({user_id: "studenta"}, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: 'Unknown user'});
    }
    user.attributes = profile.attributes;
    return done(null, user);
  });
}));

app.get("/auth/login", (req, res, next) => {
  passport.authenticate('cas', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.session.messages = info.message;
      return res.redirect('http://localhost:8080');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      req.session.messages = '';
      let rpiSID = req.cookies['connect.sid']
      User.findOneAndUpdate({user_id: user.user_id},{connect_sid: rpiSID},function(err,user) {
        if(err) {
          return next(err);
        }
        if(!user) {
          return next(null);
        }
        res.header("Set-Cookie","connect_sid="+rpiSID)
        return res.redirect('http://localhost:8080');
      })
    });
  })(req, res, next);
});

app.get("/auth/loginStatus", function(req, res) {
  User.findOne({connect_sid: req.cookies["connect_sid"]}, function (err, user) {
    if(err || user == null) {
      res.send(null)
    } else {
      res.send(user)
    }
  });
});

// app.use('/auth', authRouter);
app.use('/users', casVerify, userRouter);
app.use('/courses', casVerify, courseRouter);
app.use('/sections', casVerify, sectionRouter);
app.use('/events', casVerify, eventRouter);
app.use('/submissions', casVerify, submissionRouter);
app.use('/lectures', casVerify, lectureRouter);
app.use('/polls', casVerify, pollRouter);
app.use('/lecturesubmissions', casVerify, lectureSubmissionRouter);

var fs = require('fs'),
  http = require('http');

http.createServer(function (req, res) {
 fs.readFile(__dirname + '/../public' + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(9000);

app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT);
});