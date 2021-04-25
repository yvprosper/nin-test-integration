import express from "express";
// import other routes
import dummyRouter from "./dummyRouter";

const router = express.Router();

// mount routes
router.use("/dummy", dummyRouter);

module.exports = router;
