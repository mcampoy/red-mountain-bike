const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../database/models/Usuario');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new LocalStrategy(
    function(email, password, done){
        Usuario.findOne({email: email}, function(err, usuario) {
            if(err) return done(err);
            if(!usuario) return done(null, false, {message:'Email no existe o incorrecto'});
            if(!usuario.validPassword(password)) return done(null,false,{message:'Contraseña incorrecta'});

            return done(null, usuario);
        });
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST + '/auth/google/callback'
},
    function(accessToken, refreshToken, profile, cb){
        console.log(profile);

        Usuario.findOneOrCreateByGoogle(profile, function(err, user){
            return cb(err, user);
        });
    })
);

passport.serializeUser(function(usuario, cb) {
    cb(null, usuario.id);
});

passport.deserializeUser(function(id, cb) {
    Usuario.findById(id, function(err, usuario) {
        cb(err, usuario);
    });
});


passport.serializeUser(function( user, cb ){
    cb(null, user.id);
});

passport.deserializeUser(function(id,cb){
    Usuario.findById(id, function( err, usuario ){
        cb(null, usuario);
    })
});

module.exports = passport;
