var express = require('express');
var bodyParser = require('body-parser');
var credentials = require('./credentials.js');
var hash = require('pbkdf2-password')();
var session = require('express-session');
var mongoose = require('mongoose');

var app = express();

// database
mongoose.connect('mongodb://localhost/vulnerable-site');

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 8888);

// MIDDLEWARE
// middleware for static files
app.use(express.static(__dirname + '/public'));

// middleware for parsing URL-encoded body (POST data)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// middleware for using cookies, using cookie secret
//app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(session({
    secret: 'my_secret',
    cookie: {
        httpOnly: false
    }
}));

// middleware for displaying flash messages
app.use(function(req, res, next) {
    // if there's a flash message, transfer
    // it to the context, then clear it
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

// TODO: Export to modules

// Dummy database
var users = {
    user1: {
        name: 'user1'
    }
};
var posts = {
    post1: {
        title: 'Defenetly not malicious'
    }
};

// when create user, generate salt and hash password
hash({
    password: 'pass'
}, function(err, pass, salt, hash) {
    if (err) throw err;
    // store salt and hash in the database
    users.user1.salt = salt;
    users.user1.hash = hash;
});

// authenticate
function authenticate(name, pass, fn) {
    var user = users[name];
    if (!user) return fn(new Error('cannot find user'));
    hash({
        password: pass,
        salt: user.salt
    }, function(err, pass, salt, hash) {
        if (err) return fn(err);
        if (hash == user.hash) return fn(null, user);
        fn(new Error('incalid password'));
    });
}

// function for restricting access to route
function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.flash = {
            type: 'danger',
            intro: 'Please log in.',
            message: 'Non-users cannot create new posts',
        };
        res.redirect('/login');
    }
}

// ROUTES
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/home', function(req, res) {
    res.render('home');
});

app.get('/login', function(req, res) {
    res.render('login');
});
app.post('/login_processing', function(req, res) {
    authenticate(req.body.email, req.body.password, function(err, user) {
        if (user) {
            // regenerate session when signing in
            req.session.regenerate(function() {
                req.session.user = user;
                req.session.flash = {
                    type: 'success',
                    intro: 'Authentication successful!',
                    message: 'You are now logged in as ' + user.name,
                };
                res.redirect(303, '/home');
            });
        } else {
            req.session.flash = {
                type: 'danger',
                intro: 'Authentication error!',
                message: 'The username/password entered was not correct',
            };
            res.redirect(303, '/login');
        }
    });

    // set session for user
    //req.session.uidsession = 'secret session id for user';


});

app.get('/post', function(req, res) {
    res.render('post');
});

app.get('/new_post', restrict, function(req, res) {
    res.render('new_post');
});

app.get('/logout', function(req, res) {
    req.session.destroy(function() {
        res.redirect(303, 'home');
    });
});

// custom 404 page
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
