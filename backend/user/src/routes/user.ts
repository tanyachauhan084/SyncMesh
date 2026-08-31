import express from "express"
import { loginUser, myProfile, verifyuser } from "../controllers/user.js";
import { isAuth } from "../middleware/isAuth.js";

const router= express.Router();


router.post("/login", loginUser);


router.post("/verify", verifyuser);
export default router;