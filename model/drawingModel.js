const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drawingSchema = new Schema(
  {
    elementType: {
      type: String,
      required: true,
      enum: ["line", "rectangle", "circle", "triangle", "text"],
    },
    coordinates: [[Number]],
    startX: Number,
    startY: Number,
    endX: Number,
    endY: Number,
    width: Number,
    height: Number,
    radius: Number,
    text: String,
    fontSize: Number,
    color: {
      type: String,
      default: "#000",
    },
    thickness: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);

const whiteBoardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  elements: [drawingSchema],
});

const Drawing = mongoose.model("Drawing", whiteBoardSchema);

module.exports = Drawing;
