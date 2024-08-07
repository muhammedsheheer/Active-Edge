import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["email", "profile"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.deserializeUser((user, done) => {
	done(null, user);
});
