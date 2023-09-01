const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); // Replace with the actual app initialization code
const { v4: uuidv4 } = require("uuid");

const { expect } = chai;
chai.use(chaiHttp);

describe("Blog API Tests", () => {
  let blogId;

  // Test case for creating a blog
  it("should create a new blog", (done) => {
    chai
      .request(app)
      .post("/api/createBlog")
      .send({
        title: "Test Blog",
        content: "This is a test blog post",
        authorId: "author123",
        authorName: "John Doe",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.title).to.equal("Test Blog");
        expect(res.body.content).to.equal("This is a test blog post");
        expect(res.body.authorId).to.equal("author123");
        expect(res.body.authorName).to.equal("John Doe");
        blogId = res.body.blogId; // Store the blogId for later use
        done();
      });
  });

  // Test case for getting all blogs
  it("should get all blogs", (done) => {
    chai
      .request(app)
      .get("/api/getBlogs")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        // Add more assertions as needed
        done();
      });
  });

  // Test case for getting a specific blog by ID
  it("should get a specific blog by ID", (done) => {
    chai
      .request(app)
      .get(`/api/getBlog/${blogId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.blogId).to.equal(blogId);
        // Add more assertions as needed
        done();
      });
  });

  // Test case for updating a blog
  it("should update a blog", (done) => {
    chai
      .request(app)
      .put(`/api/updateBlog/${blogId}`)
      .send({
        title: "Updated Blog Title",
        content: "Updated content for the blog",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.title).to.equal("Updated Blog Title");
        expect(res.body.content).to.equal("Updated content for the blog");
        // Add more assertions as needed
        done();
      });
  });

  // Test case for deleting a blog
  it("should delete a blog", (done) => {
    chai
      .request(app)
      .delete(`/api/deleteBlog/${blogId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.equal("Delete Successful");
        // Add more assertions as needed
        done();
      });
  });
});
