const express = require("express");

const {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blog");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getBlogs);

router.get("/:id", protect, getBlog);

router.post("/", protect, createBlog);

router.delete("/:id", protect, deleteBlog);

router.patch("/:id", protect, updateBlog);

module.exports = router;
