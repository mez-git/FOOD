import express from "express";
import { checkAuth, login, logout,signup, updateProfile} from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.route("/check-auth").get(isAuthenticated, checkAuth);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/profile/update").put(isAuthenticated,updateProfile);

export default router;