exports.errorHandle = (err, req, res, next) => {
   console.log(`--- ---- ----`);
   console.log(err.name, err.message, err.stack);
   console.log(`--- ---- ----`);
   res.status(500).send({
      status: "failed",
      message: err.message,
      name: err.name,
      stack: err.stack,
   });
};
