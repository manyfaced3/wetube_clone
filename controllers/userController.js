import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      // To Do : Register User
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    // eslint-disable-next-line camelcase
    _json: { id, avatar_url, name, email, login, html_url }
  } = profile;
  try {
    let user = null;
    if (email != null) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ email: html_url });
    }
    // user 있을 경우
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    // user 없을 경우 newUser 생성
    let newUser = null;
    if (email == null && name == null) {
      newUser = await User.create({
        email: html_url,
        name: login,
        githubId: id,
        avatarUrl: avatar_url
      });
    } else if (email != null) {
      newUser = await User.create({
        email,
        name: login,
        githubId: id,
        avatarUrl: avatar_url
      });
    } else {
      newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url
      });
    }
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetails = (req, res) =>
  res.render("userDetails", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
