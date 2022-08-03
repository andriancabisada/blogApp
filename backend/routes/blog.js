const express = require("express");

const {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blog");

const router = express.Router();

router.get("/", getBlogs);

router.get("/:id", getBlog);

router.post("/", createBlog);

router.delete("/:id", deleteBlog);

router.patch("/:id", updateBlog);

module.exports = router;
