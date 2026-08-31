import express from "express"
import { loginUser, verifyuser } from "../controllers/user.js";

const router= express.Router();


router.post("/login", loginUser);


router.post("/verify", verifyuser);

export default router;