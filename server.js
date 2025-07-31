require("dotenv").config();
const express = require("express");
const { connectDb } = require("./data/connect");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const app = express();
app.use(express.json());

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    }),
  )
  .use(passport.initialize())
  .use(passport.session())

  .use((req, res, next) => {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    next();
  })
  .use(cors({ methods: "GET, POST, PUT, DELETE, OPTIONS" }))
  .use(cors("{origin: '*' }"))
  .use("/", require("./routes")); // Centralized routes

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you would typically save the user to your database
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user != undefined
      ? `Logged in as ${req.session.user.username}`
      : "Logged out",
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/apic-docs",
    session: false,
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect("/");
  },
);

connectDb(() => {
  app.listen(3000, () =>
    console.log("🚀 Server running on http://localhost:3000"),
  );
});