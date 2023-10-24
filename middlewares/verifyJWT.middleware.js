const jwt = require("jsonwebtoken");
// const { promisify } = require("util");
const { promisify } = require("util");

exports.verifyJWT = async (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      if (!token) {
         return res.status(400).send({
            status: "failed",
            message: "You aren't logged In",
         });
      }

      const decoded = await promisify(jwt.verify)(
         token,
         process.env.SECRET_KEY
      );
      req.user = decoded;
      console.log(decoded);
      next();
   } catch (err) {
      next(err);
   }
};
