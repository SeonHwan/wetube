import multer from "multer";
import routes from "./routes";

export const multerVideo = multer({ dest: "uploads/videos/" });
export const multerAvatar = multer({ dest: "uploads/avatars/ " });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  console.log("middlewares");
  // console.log(`middleware loggedUser._id = ${res.locals.loggedUser._id}`);
  // console.log(`locals middleware ${req.user.username}`);
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerVideo.single("avatar");
