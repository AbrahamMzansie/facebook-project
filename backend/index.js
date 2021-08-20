const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const postRoute = require("./routes/postRoutes");

const path = require("path");
const multer = require("multer");


dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log(`Connected to the mongo db database`);
  }
);

//middleware
app.use("/images" , express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, "public/images");
  },
  filename: (req, file, cb)=> {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`backend server is running ${port}`);
});
