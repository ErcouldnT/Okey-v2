const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.auth) {
      // throw
      res.status(401).json({
        message: "Forbidden access."
      });
    } else {
      const token = req.headers.auth;
      const payload = await jwt.verify(token, process.env.SECRET);
      req.payload = payload;
      next();
    };
  } catch (error) {
    res.status(401).json({
      message: "Forbidden access."
    });
  };
};
