import express from "express";
// import other routes
import dummyRouter from "./dummyRouter";
import ninRouter from "./ninRouter"

const router = express.Router();

// mount routes
router.use("/dummy", dummyRouter);
router.use("/nin", ninRouter);

module.exports = router;
