const express = require("express");

const { upload, uploaded } = require("../controllers/upload");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", upload);

router.post("/", protect, uploaded);

module.exports = router;
