const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require('dotenv').config()




const app = express();
app.use(cors())
app.use(express.static('public'));
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));


var emailInDB=false;


const uri = process.env.MONGO_DB_URI;

mongoose.connect(uri, {useNewUrlParser: true});

const emailUserSchema = {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    withGoogle: Boolean,
    // verified: Boolean,
    // date: String
  };

const EmailUsers = mongoose.model("user", emailUserSchema);

const googleUserSchema = {
  firstName: String,
  lastName: String,
  email: String,
  googleID: String,
  imgUrl: String,
  withGoogle: Boolean,
  // date: String
};

const GoogleUsers = mongoose.model("googleUser", googleUserSchema);


app.get('/', function (req, res) {
    res.send({"Chaim": "Shwartz"})
})

app.post('/signup', function (req, res) {
  EmailUsers.findOne({email: req.body.email},function (err, foundUser) {  //get the user from DB with same email
    if (err) {
      console.log("erron in signup post")
      console.log(err)
    }
    else if(foundUser!==null){ //if there is already a user in the DB with same email
      res.send({success: false,title :"Registration Failed!", reason: "Your TripTremp account ("+req.body.email+") is already registered, try to login to TripTremp"})
    }
    else if(foundUser===null)  // if there is no user in the DB with this email
    {
      GoogleUsers.findOne({email: req.body.email},function (err, foundUser) {  //get all the users from DB
        if (err) {
          console.log("erron in signup post")
          console.log(err)
        }
        else if(foundUser!==null){   //if there is already a user in the google DB with same email
          res.send({success: false,title :"Registration Failed!", reason: "Your TripTremp account ("+req.body.email+") is already registered with Google, try to login with Google."})
        }
        else if (foundUser===null) {  // if the is no user in the google DB with this email, so save this user because this user is not in the DBs
          const user = new EmailUsers({
            firstName: req.body.FName,
            lastName: req.body.LName,
            email: req.body.email,
            password: req.body.password,
            withGoogle: req.body.withGoogle,
            // verified: true,
            // date: 'yeah'
          });
          user.save();
          res.send({success: true, title: "Registration success!", reason: "Welcome to TripTremp, Your account successfully created. now you need to go to the login page for signing in and you will be able to use the app. enjoy!"})      
        }
      })
    }
  })
})

app.post('/login', function (req,res) {

  EmailUsers.findOne({email: req.body.email}, function (err, userFound) {   // find if the user is in the DB
    if (err) {
      console.log(err)
    } else {
      if (userFound===null) {  // if the user is not in DB
        console.log("need to register")
        res.send({success: false,title:"Failed to login", reason: "This Email ("+req.body.email+") is already not registered."})
      } 
      else {  // if the user is in the DB
        if (userFound.password===req.body.password) {// check if the password is right
          console.log("login successfully")
          res.send({success: true, userFound})
        } else {  // if the password is not right
          console.log("password invalid")
          res.send({success: false, title: "Failed to login", reason:"The Password is incorrect."})
        }
      }
    }
  })
})

app.post('/googlelogin', function (req,res) {
  GoogleUsers.findOne({email: req.body.email},function (err, foundUser) {  // find the user with the same email to check if need to add to the google DB
    if (err) {
      console.log(err)
    } else {
      if (foundUser===null) {
        const gUser = new GoogleUsers({
          firstName: req.body.name,
          lastName: req.body.family,
          email: req.body.email,
          googleID: req.body.googleID,
          imgUrl: req.body.profileImg,
          withGoogle: true
        })
        gUser.save()
      }
    }
  })
  EmailUsers.findOne({email: req.body.email}, function (err, userFound){ // check if the user is already register with email, and then need to merge the users
    if (err) {
      console.log(err)
    } else {
      console.log(userFound.id)
    }
  })

})



app.listen(5000, function () {
    console.log("app is listening to port 5000")
})