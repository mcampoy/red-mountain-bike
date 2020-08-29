require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Passport
const passport = require('./config/passport');
// Session
const session = require('express-session');
// mongoStore
const MongoDBStore = require('connect-mongodb-session')(session);
// JsonWebToken
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var tokenRouter = require('./routes/token');
var bicicletasRouter = require('./routes/bicicletas');
var usuariosAPIRouter = require('./routes/api/usuarios');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var authAPIRouter = require('./routes/api/auth');

const Usuario = require('./database/models/Usuario');
const Token = require('./database/models/Token');

// const store = new session.MemoryStore;

let store;
if (process.env.NODE_ENV === 'development') {
  store = new session.MemoryStore;
} else {
  store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
  });
  store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
  });
}

var app = express();
app.set('secretKey','jwt_rdb_red!Bici-c?908050');
app.use(session({
  cookie: { maxAge: 240 * 60 * 60 * 1000 },
  store: store,
  saveUninitialized: true,
  resave: true,
  secret: 'redBici2020"!'
}));

// Mongoose
const mongoose = require('mongoose');
const { assert } = require('console');

// const mongoDB = 'mongodb://localhost/red_bicicletas';

// const mongoDB = 'mongodb+srv://admin:hola2020@cluster0.5mkeu.mongodb.net/red_bicicletas?retryWrites=true&w=majority';
const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Inicialización de passport
app.use(passport.initialize());
app.use(passport.session());

// Ubicación de documentos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas del login, logout y forgotPassword

app.get('/login', function(req, res){
  res.render('session/login');
});

app.post('/login', function(req, res, next){

  //uso del passport
  passport.authenticate('local', function(err, usuario, info){
    if(err) return next(err);
    if(!usuario) return res.render('session/login',{info});
    req.logIn(usuario, function(err){
        if(err) return next(err);

        return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

app.get('/forgotPassword', function(req, res){
  res.render('session/forgotPassword');
});

app.post('/forgotPassword', function(req,res,next){
  	Usuario.findOne({email: req.body.email}, function(err, usuario){
    	console.log(usuario);
    	if(!usuario) return res.render('session/forgotPassword',{info: {message: 'No existe el email para usuario existente'}});
    
		usuario.resetPassword(function(err){
		if(err) return next(err);
		console.log('session/forgotSessionMessage')
		});
    
    	res.render('session/forgotPasswordMessage');
  
  	});
});

app.get('/resetPassword/:token', function(req, res, next){
  	Token.findOne({token: req.params.token}, function(err, token){
		if(!token) return res.status(400).send({
			type:'not-verified', 
			msg: 'No existe usuario asociado al token. Verificá que tu token no haya expirado'
		});

		Usuario.findById(token._userId, function(err, usuario){
			if(err) return res.status(400).send({msg: 'No existe usuario asociado a ese token'});
			res.render('session/resetPassword', {errors: {}, usuario: usuario});
		});
  	});
});

app.post('/resetPassword', function(req, res, next){
	if(req.body.password != req.body.confirm_password){
		res.render('session/resetPassword', {errors: {confirm_password: 'Las contraseñas no coinciden'}});
		return;
	}

	Usuario.findOne({email: req.body.email}, function(err, usuario){
		usuario.password = req.body.password;
		usuario.save(function(err){
			if(err){
				res.render('session/resetPassword',{errors: err.errors, usuario: new Usuario()});
			} else {
				res.redirect('/login');
			}
		});
	});
});


app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/token', tokenRouter);
app.use('/bicicletas', loggedIn, bicicletasRouter);
app.use('/api/bicicletas', validarUsuario, bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);
app.use('/api/auth', authAPIRouter);

// Políticas de privacidad
app.use('/privacy-policy', function (req, res){
	res.sendFile('public/privacy-policy.html')
})

// Google OAuth
app.use('/googlee9be53acbc5cdf42', function (req, res){
	res.sendFile('public/googlee9be53acbc5cdf42.html')
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] })
);

app.get('/auth/google/callback', passport.authenticate( 'google', {
  successRedirect: '/',
  failureRedirect: '/error'
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Implementación del middleware de loggedIn
function loggedIn(req, res, next){
	if(req.user){
    next();
	} else {
		console.log('Usuario no logueado');
		res.redirect('/login');
	};
};

function validarUsuario(req, res, next){
	jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded){
		if(err){
			res.json({status: "Error", message: err.message, data: null});
		} else {
			req.body._userId = decoded.id;

			console.log('jwt verify ' + decoded);

			next();

		}
	});
}

module.exports = app;
