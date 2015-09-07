// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var jwt = require('jsonwebtoken');
var settings = require('./config');
var morgan = require('morgan');
var cors = require('cors')




// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

var port = process.env.PORT || 9090; // set our port

var mongoose = require('mongoose');
mongoose.connect(settings.db); // connect to our database

app.set('superSecret', settings.secret);

//require in mongoose models
var User = require('./app/models/user');
var Recipe = require('./app/models/recipe');
var ShoppingList = require('./app/models/shoppinglist');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

router.route('/createAccount')

	.post(function(req, res){

			//user DB object
			var user = new User();

			//set values from request to DB properties
			user.email = req.body.email;
			user.password = req.body.password;

			//Insert record into DB
			user.save(function(err, user){
				if(err) throw err;

			console.log('User Created Successfully');
			res.json({success: true, user: user._id});

		});
	});



router.route('/authenticate')

	.post(function(req,res){

		console.log('attempting to authenticate');

		// find the user
		  User.findOne({
		    email: req.body.email
		  }, function(err, user) {

		    if (err) throw err;

		    if (!user) {
		      res.json({ success: false, message: 'Authentication failed. Email or Password not correct.' });
		    } else if (user) {

		      // check if password matches
		      if (user.password != req.body.password) {
		        res.json({ success: false, message: 'Authentication failed. Email or Password not correct.' });
		      } else {

		        // if user is found and password is right
		        // create a token
		        var token = jwt.sign({_id: user._id, email: user.email, authenticated: true}, app.get('superSecret'), {
		          expiresInMinutes: 1440 // expires in 24 hours
		        });

		        // return the information including token as JSON

		        console.log('token successful');

		        res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          token: token
		        });
		      }

		    }

		  });
});

//runs on every request
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
      	res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});


//

router.route('/recipe')

	.post(function(req, res) {

		User.findOne({_id: req.decoded._id}, function(err, user) {

			var recipe = new Recipe();

			recipe.User_Id = user._id;
			recipe.name = req.body.name;
			recipe.instructions = req.body.instructions;
			recipe.ingredients = req.body.ingredients;

			recipe.save(function(err, recipe) {
				res.json({success: true});
			});
		});
	})
	//get all recipes for a specific user
	.get(function(req, res) {
		User.findOne({_id: req.decoded._id}, function(err, user) {
			Recipe.find({User_Id: user._id}, function(err, recipes) {
				res.json(recipes);
			});
		});
	});

router.route('/shoppinglist')
	.post(function(req, res) {

		User.findOne({_id: req.decoded._id}, function(err, user) {

			var shoppinglist = new ShoppingList();

			shoppinglist.User_Id = user._id;
			shoppinglist.name = req.body.name;
			shoppinglist.recipes = req.body.recipes;

			shoppinglist.save(function(err, shoppinglist) {
				res.json({success: true});
			});
		});
	})

	.get(function(req, res){
		User.findOne({_id: req.decoded._id}, function(err, user) {
			ShoppingList.find({User_Id: user._id}, function(err, shoppinglists) {
				res.json(shoppinglists);
			});
		});
	});

router.route('/shoppinglist/:name')
	.get(function(req, res) {
		User.findOne({_id: req.decoded._id}, function(err, user) {
			ShoppingList.findOne({name: req.params.name, User_Id: user._id}, function(err, shoppinglist) {
				if(err) {
					throw err;
				}

				res.json(shoppinglist);
			});
		});

	})

	.put(function(req, res){
		//update a single recipe

		User.findOne({_id: req.decoded._id}, function(err, user){
			if(err) {
				throw err;
			}
			ShoppingList.findOne({name: req.params.name, User_Id: user._id}, function(err, shoppinglist) {
				shoppinglist.name = req.body.name;
				shoppinglist.recipes = req.body.recipes;
				shoppinglist.markModified('recipes');

				shoppinglist.save(function(err, shoppinglist) {
					res.json({success: true});
				});
			});
		});

	});

router.route('/recipe/:name')

	.get(function(req, res) {
		//get single recipe for specific user

		User.findOne({_id: req.decoded._id}, function(err, user){
			Recipe.findOne({name: req.params.name, User_Id: user._id}, function(err, recipe){

				if(err){
					throw err;
				}

				res.json(recipe);
			});
		});

	})

	.put(function(req, res){
		//update a single recipe

		User.findOne({_id: req.decoded._id}, function(err, user){

			if(err){
				throw err;
			}

			Recipe.findOne({name: req.params.name, User_Id: user._id}, function(err, recipe){

				recipe.name = req.body.name;
				recipe.ingredients = req.body.ingredients;
				recipe.instructions = req.body.instructions;


				recipe.markModified('ingredients');
				recipe.markModified('instructions');

				recipe.save(function(err, recipe){

					res.json({success: true});

				});

			});
		});

	})

	.delete(function(req, res){
		//remove a single recipe
	});

app.use('/api', router);

server.listen(port);
console.log('Carl Papa happens on port ' + port);
