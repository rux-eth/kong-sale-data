import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.send("hello world");
  })
);

export default router;
