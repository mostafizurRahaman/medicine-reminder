const mongoose = require("mongoose");
const colors = require("colors");
const app = require("./app");
const { errorHandle } = require("./middlewares/errorHandle.middleware");
require("dotenv").config();

// PORT:
const port = process.env.PORT || 8080;
const URI = process.env.DATABASE_ATLAS;

// database connection :
mongoose
   .connect(URI)
   .then(() => {
      console.log(`Database Connected Successfully`.blue.bold);
   })
   .catch((err) => {
      console.log(err);
      console.log(`${err.message}`.red.bold);
   });

app.get("/", (req, res, nex) => {
   res.send("Yah!!! Our server is running now.");
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`.blue.bold);
});

app.use(errorHandle);

process.on("unhandledRejection", (err) => {
   console.log(err);
   mongoose.connection
      .close()
      .then(() => {
         process.exit(1);
      })
      .catch((err) => {
         console.log(`mongoose.error`, err);
      });
});
