const blogDb = require("../models/blog");
const { v4: uuidv4 } = require("uuid");

const createBlog = async (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content cannot be empty" });

  const blog = new blogDb({
    blogId: uuidv4(),
    title: req.body.title,
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
};

const getBlogs = async (req, res) => {
  try {
    const blog = await blogDb.find();
    res.json(blog);
  } catch (err) {
    res.send("Error " + err);
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await blogDb.findById(req.params.blogId);
    res.json(blog);
  } catch (error) {
    res.send("Error " + error);
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const task = await taskDb.findById(id);
  task.name = req.body.name;
  task.description = req.body.description;
  task.status = req.body.status;
  await task
    .save(task)
    .then((data) => {
      res.json(task);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating",
      });
    });
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;
  await blogDb
    .findByIdAndDelete(blogId)
    .then((data) => {
      if (!data) {
        res.send({
          message: `Cannot Delete with id ${blogId}. Maybe something is wrong`,
        });
      } else {
        res.send({ message: "Successfully deleted" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete blog id " + blogId });
    });
};

const updateBlog = async (req, res) => {
  const blogId = req.params.blogId;
  const blog = await blogDb.findById(blogId);
  blog.title = req.body.title;
  blog.content = req.body.content;
  await blog
    .save(blog)
    .then((data) => {
      res.json(blog);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating",
      });
    });
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
