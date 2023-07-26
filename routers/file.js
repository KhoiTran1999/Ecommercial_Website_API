const express = require("express");
const router = express.Router();
const ErrorResponse = require("../responses/errorResponse");
const MongoDB = require("../database/connectMongo");

router.get("/:filename", async (req, res) => {
  const { filename } = req.params;

  const file = await MongoDB.bucket.find({ filename }).toArray((err, files) => {
    console.log(err);
  });

  if (!file || !file.length) {
    return next(new ErrorResponse(404, "File is not found"));
  }

  MongoDB.bucket.openDownloadStreamByName(filename).pipe(res);
});

module.exports = router;
