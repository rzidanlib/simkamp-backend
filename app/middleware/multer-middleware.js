import multer from "multer";
import path from "path";
import fs from "fs";

// const tempDir = "/tmp/public/images";

const storageMultiple = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "public/images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadMultiple = multer({
  storage: storageMultiple,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("image", 12);

// Set storage engine
const storage = (destination) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const destPath = `public/images/${destination}`;
      cb(null, destPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use Date.now() to ensure unique filenames
    },
  });

const upload = (destPath) => {
  return multer({
    storage: storage(destPath),
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  });
};

// // Check file Type
function checkFileType(file, cb) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}

export { uploadMultiple, upload };
