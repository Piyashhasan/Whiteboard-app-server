require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;
const errorHandler = require("./middleware/errorHandler");
const drawingRouter = require("./routes/drawingRoutes");

// --- common middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- DATA BASE connection ---
const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dba67.mongodb.net/WhiteBoard?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Successfully DB connected...!");
  } catch (err) {
    console.log("DB Connection Failed...!");
  }
};

// --- product api endpoint ---
app.use("/drawings", drawingRouter);

// --- root api endpoint ---
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Server is running..!",
  });
});

// --- Not found error handler middleware ---
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  error.name = "NotFound";
  next(error);
});

// Universal error handler middleware
app.use(errorHandler);

// --- server running listening port ---
dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at PORT - ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
