var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 8888);

// set up middleware for static files
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('post', function(req, res) {
  res.render('post');
});

app.get('/new_post', function(req, res) {
  res.render('new_post');
});


// custom 404 page
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
    console.error(er.stack);
    res.status(500);
    res.render('500');
  });

  app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});
