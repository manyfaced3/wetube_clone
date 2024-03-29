import express from "express";
import routes from "../routes";
import {
  users,
  userDetails,
  editProfile,
  changePassword
} from "../controllers/userController";
import { onlyPrivate } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetails(), onlyPrivate, userDetails);

export default userRouter;
