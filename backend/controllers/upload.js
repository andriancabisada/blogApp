const multer = require("multer");
const path = require("path");
const { protect } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const uploader = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const upload = async (req, res) => {
  res.render("upload");
};

const uploaded = protect(async (req, res) => {
  uploader(req, res, (err) => {
    if (err) {
      res.render("upload", {
        msg: err,
      });
    } else {
      if (req.file == undefined) {
        res.render("upload", {
          msg: "Error: No File Selected!",
        });
      } else {
        res.render("upload", {
          msg: "File Uploaded!",
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
});

module.exports = {
  upload,
  uploaded,
};
