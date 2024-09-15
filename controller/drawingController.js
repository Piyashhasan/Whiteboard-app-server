const Drawing = require("../model/drawingModel");

// --- create drawing controller ---
exports.createDrawing = async (req, res) => {
  try {
    const newDrawing = new Drawing(req.body);
    const saveDrawingToDB = await newDrawing.save();
    if (saveDrawingToDB) {
      res.status(201).json({
        status: true,
        success: "Success",
      });
    }
  } catch (err) {
    console.log("--- Error from createDrawing controller ---");
    res.json({
      status: false,
      error: err.message,
      validationError: err._message,
    });
  }
};

// --- get all drawing controller ---
exports.getAllDrawings = async (req, res) => {
  try {
    const getAllDrawings = await Drawing.find({});
    if (getAllDrawings) {
      res.status(200).json({
        status: true,
        success: "Success",
        data: getAllDrawings,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Drawings not available...",
      });
    }
  } catch (err) {
    console.log("--- Error from getAllDrawings controller ---");
    res.json({
      status: false,
      error: err.message,
    });
  }
};

// --- get single drawing controller ---
exports.getSingleDrawing = async (req, res) => {
  try {
    const drawingId = req.params?.id;
    const findDrawing = await Drawing.findById(drawingId).exec();
    if (findDrawing) {
      res.status(200).json({
        status: true,
        success: "Success",
        data: findDrawing,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Drawing not found...",
      });
    }
  } catch (err) {
    console.log("--- Error from getSingleDrawing controller ---");
    res.json({
      status: false,
      error: err.message,
    });
  }
};

// --- update drawing controller ---
exports.updateSingleDrawing = async (req, res) => {
  try {
    const drawingId = req.params?.id;
    const updateData = req.body;

    const updateDrawing = await Drawing.findByIdAndUpdate(
      drawingId,
      updateData
    );

    if (updateDrawing) {
      res.status(200).json({
        status: true,
        success: "Success",
      });
    }
  } catch (err) {
    console.log("--- Error from updateSingleDrawing controller ---");
    console.log(err.message);
  }
};

// --- delete drawing controller ---
exports.deleteSingleDrawing = async (req, res) => {
  try {
    const drawingId = req.params.id;
    const deleteDrawing = await Drawing.findByIdAndDelete(drawingId);
    if (deleteDrawing) {
      res.status(200).json({
        status: true,
        success: "Success",
      });
    }
  } catch (err) {
    console.log("--- Error from deleteSingleDrawing controller ---");
    console.log(err.message);
  }
};
