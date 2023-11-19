import express from "express";
import matchCtrl from "../controllers/match.controller.js";

const router = express.Router();

router.route("/api/rank").get(matchCtrl.rank);

export default router;