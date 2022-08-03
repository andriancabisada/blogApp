const express = require("express");

const { upload, uploaded } = require("../controllers/upload");

const router = express.Router();

router.get("/", upload);

router.post("/", uploaded);

module.exports = router;
