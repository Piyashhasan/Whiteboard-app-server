const express = require("express");
const {
  createDrawing,
  getAllDrawings,
  getSingleDrawing,
  updateSingleDrawing,
  deleteSingleDrawing,
} = require("../controller/drawingController");
const drawingRouter = express.Router();

drawingRouter
  .post("/", createDrawing)
  .get("/", getAllDrawings)
  .get("/:id", getSingleDrawing)
  .patch("/:id", updateSingleDrawing)
  .delete("/:id", deleteSingleDrawing);

module.exports = drawingRouter;
