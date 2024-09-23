const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, done) {

        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profileImage: profile.photos[0].value
        };

        try {

            let user = await User.findOne({
                googleId: profile.id
            });

            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            }

        } catch (error) {
            console.log(error);
        }

    }
));

//Google login Route
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));


//reciving User Dada
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login-failed',
        successRedirect: '/dashboard'

    })
);

router.get('/login-failed', (req, res) => {
    res.send('Oops wrong info');
});

//Destroy User's session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            console.log(error);
            res.send('Error logging out :( ');
        } else {
            res.redirect('/');
        }
    })
});

//presist user data after login
passport.serializeUser((user, done) => {
    done(null, user.id);
});


//Retrieve user dada from session.
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})

module.exports = router;