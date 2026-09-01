import express from "express"
import { getAllUser, getAUser, loginUser, myProfile, updateName, verifyuser } from "../controllers/user.js";
import { isAuth } from "../middleware/isAuth.js";

const router= express.Router();


router.post("/login", loginUser);


router.post("/verify", verifyuser);

router.get("/me", isAuth, myProfile);

router.get("/user/all", isAuth, getAllUser);

router.get("/user/:id", getAUser);

router.get("/updated/user", isAuth, updateName);

export default router;