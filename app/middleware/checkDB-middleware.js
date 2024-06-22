import db from "../config/database-config.js";

const checkDatabaseConnection = (req, res, next) => {
  db.query("SELECT NOW()", (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database connection error",
        error: err,
      });
    }
    next();
  });
};

export default checkDatabaseConnection;
