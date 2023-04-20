const express = require("express");
const bodyparser = require("body-parser");
const { errorHandler } = require("./middleware/errorMiddleware");
const morgan = require("morgan");
const connectDB = require("./database/config");
const blogRoutes = require("./routes/blog");
const uploadRoutes = require("./routes/upload");
const userRoutes = require("./routes/user");

const app = express();

// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded());

// EJS
app.set("view engine", "ejs");

//Public Folder
app.use(express.static("./uploads"));

app.get("/", (req, res) => res.render("upload"));

//middleware
app.use(express.json());
app.use("/blog", blogRoutes);
app.use("/upload", uploadRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
