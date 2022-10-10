const blogDb = require("../models/blog");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const redis = require("redis");

const redisPort = 6379;
const client = redis.createClient(redisPort);

client.on("error", (err) => {
  console.log(err);
});

const createBlog = asyncHandler(async (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content cannot be empty" });

  const blog = new blogDb({
    blogId: uuidv4(),
    title: req.body.title(),
    content: req.body.content,
    authorId: req.body.authorId,
    authorName: req.body.authorName,
  });

  await blog
    .save(blog)
    .then((data) => {
      res.json(blog);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
});

const getBlogs = asyncHandler(async (req, res) => {
  try {
    const blog = await blogDb.find();
    res.json(blog);
  } catch (err) {
    res.send("Error " + err);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  try {
    client.get(req.params.blogId, async (err, blog) => {
      if (blog) {
        res.json(blog);
      } else {
        const blog = await blogDb.findById(req.params.blogId);
        res.json(blog);
      }
    });
  } catch (error) {
    res.send("Error " + error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await blogDb.findById(req.params.id);
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }

  await blog.remove(req.params.id);

  res.status(200).json("Delete Successfull");
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await blogDb.findById(req.params.blogId);

  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }

  const updatedBlog = await blogDb.findByIdAndUpdate(
    req.params.blogId,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedBlog);
});

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
