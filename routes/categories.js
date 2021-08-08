var express = require("express");
var router = express.Router();
const model = require("../models/index");

/* GET categories listing. */
router.get("/", async function (req, res, next) {
  try {
    const categories = await model.categories.findAll({});
    res.json({
      status: "OK",
      messages: "",
      data: categories,
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { name } = req.body;
    const categories = await model.categories.create({
      name,
    });

    if (categories) {
      res.status(201).json({
        status: "OK",
        messages: "Kategori berhasil ditambahkan",
        data: categories,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

router.patch("/:id", async function (req, res, next) {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    const categories = await model.categories.update(
      {
        name,
      },
      {
        where: {
          id: categoryId,
        },
      }
    );
    if (categories) {
      res.json({
        status: "OK",
        messages: "Kategori berhasil diupdate",
        data: categories,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const categoryId = req.params.id;
    const categories = await model.categories.destroy({
      where: {
        id: categoryId,
      },
    });
    if (categories) {
      res.json({
        status: "OK",
        messages: "Kategori berhasil dihapus",
        data: categories,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

module.exports = router;
