import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import {
  facebookLoginCallback,
  githubLoginCallback,
} from "./controller/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
      scope: "user:email",
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://ededbada28ff.ngrok.io/${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "email"],
    },
    facebookLoginCallback
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  User.findById(user._id, (err, findUser) => {
    // console.log(`deserialize user : ${findUser.username}`);
    done(err, findUser);
  });
});
