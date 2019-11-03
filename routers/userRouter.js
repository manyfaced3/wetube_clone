import express from "express";
import routes from "../routes";
import {
  users,
  userDetails,
  editProfile,
  changePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetails(), userDetails);

export default userRouter;
