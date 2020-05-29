var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var firebase = require("./firebase");
var axios = require("axios");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/register", (req, res, next) => {
  let { name, college, year, email, password } = req.body;
  var newUser = {
    name,
    college,
    year,
    email,
  };
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((ress) => {
      axios
        .post("https://wtf-userdb.firebaseio.com/users.json", newUser)
        .then(() => {
          res.render("main.ejs", { user: newUser });
        })
        .catch((error) => {
          console.log(error);
          res.redirect("/login");
        });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/login");
    });

  console.log(newUser);
});

app.post("/login", (req, res) => {
  var { email, password } = req.body;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      axios
        .get("https://wtf-userdb.firebaseio.com/users.json")
        .then((response) => {
          var data = response.data;
          var getUser;
          for (var key in data) {
            if (data[key].email == email) {
              getUser = data[key];
              break;
            }
          }
          res.render("main.ejs", { user: getUser });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/register");
    });
});

app.post("/changepwd", (req, res) => {
  var { email, opassword, npassword } = req.body;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, opassword)
    .then(() => {
      var cUser = firebase.auth().currentUser;
      var newPassword = npassword;
      cUser
        .updatePassword(newPassword)
        .then(function () {
          console.log("password changed");
          res.redirect("/login");
        })
        .catch(function (error) {
          console.log(error);
          res.redirect("/login");
        });
    });
});

app.listen(3000 || process.env.PORT, () => {
  console.log("Server Started");
});
