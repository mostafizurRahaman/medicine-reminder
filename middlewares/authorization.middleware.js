exports.authorization = (...role) => {
   return (req, res, next) => {
      if (!role.includes(req.user.role)) {
         return res.status(403).status({
            status: "failed",
            message: "UnAuthorized User",
         });
      }
      next();
   };
};
