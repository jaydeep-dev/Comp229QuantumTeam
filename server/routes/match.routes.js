import express from "express";
import matchCtrl from "../controllers/match.controller.js";

const router = express.Router();

router.route("/api/match").get(matchCtrl.list).post(matchCtrl.create).delete(matchCtrl.remove);

export default router;