// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const search = require("../utils/scrape-atlas-obscura");
// const { in } = require("sequelize/types/lib/operators");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/search/:country?/:city?/:state?", (req, res) => {
    const country = req.params.country ? req.params.country : null;
    const city = req.params.city ? req.params.city : null;
    const state = req.params.state ? req.params.state : null;

    search.getURL({ country, city, state }).then(({ data }) => {
      res.json(search.extractData(data))
    }).catch(err => res.send(err))
  });

  app.post("/api/list", (req, res) => {
    let ourUser = db.User.findOne({
      where: {
        password: req.body.password
      }
    }).then(results => {
      let user = results[0].getDataValue('id');

      let ourWannaGos = db.WannaGo.findAll({
        where: {
          UserId: user
        }
      }).then(wannaGoResults => {

        let wannaGoRow = wannaGoResults.reduce((map, obj) => {
          let internalMap = {};
          internalMap['idk'] = obj.getDataValue('idk');
          internalMap['startDate'] = obj.getDataValue('startDate');
          internalMap['endDate'] = obj.getDataValue('endDate');

          map[obj.getDataValue('id')] = internalMap;
          return map;
        }, {});
      })
    });

  // app.post("/api/wannago", (req, res) => {
  //   let ourUser = db.User.findOne({
  //     where: {
  //       email: req.body.email,
  //     }
  //   });

  //   let ourAttraction = db.Attraction.findOrCreate({
  //     where: {
  //       email: req.body.email,
  //       name: req.body.attraction
  //     }
  //   });
  //   Promise.all([ourUser, ourAttraction]).then(results => {

  //     let user = results[0].getDataValue("id");
  //     let attraction = results[1][0].getDataValue('id');

  //     let ourWannaGo = db.WannaGo.findOrCreate({
  //       where: {
  //         UserId: user,
  //         attractionId: attraction
  //       }
  //     }).then(results => {
  //       let wannaGo = results[0];


  //       let today = new Date();
  //       let todayString = `${today.getFullYear()}-$${today.getMonth() + 1}-${today.getDate()}`;

  //       if (req.body.startDate.length == 0)
  //         req.body.startDate = todayString;
  //       if (req.body.endDate.length == 0)
  //         req.body.endDate = todayString;


  //       wannaGo.set('idk', req.body.idk === 'on' ? 1 : 0);
  //       wannaGo.set('startDate', req.body.startDate);
  //       wannaGo.set('endDate', req.body.endDate);
  //       wannaGo.save();
  //     })
    // });
  });

};
