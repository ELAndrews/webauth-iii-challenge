const jwt = require("jsonwebtoken");

module.exports = { restrictedAdminAccess, restricted };

function restrictedAdminAccess(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "SonnyIsBeautiful",
      { audience: "1" },
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "token bad" });
        } else {
          req.decodedToken = decoded;
          next();
        }
      }
    );
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "SonnyIsBeautiful",
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "token bad" });
        } else {
          req.decodedToken = decoded;
          next();
        }
      }
    );
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}
