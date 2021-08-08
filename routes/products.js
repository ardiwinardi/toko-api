var express = require("express");
var router = express.Router();
const model = require("../models/index");

/* GET products listing. */
router.get("/", async function (req, res, next) {
  try {
    let options = {};

    if (req.query.category_id) {
      options.where = {
        category_id: req.query.category_id,
      };
    }

    if (req.query.limit) {
      options.limit = parseInt(req.query.limit);
      options.offset = parseInt(req.query.offset);
    }

    const products = await model.products.findAll(options);
    res.json({
      status: "OK",
      messages: "",
      data: products,
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

router.get("/:slug", async function (req, res, next) {
  try {
    const products = await model.products.findOne({
      whrere: {
        slug: req.params.slug,
      },
    });
    res.json({
      status: "OK",
      messages: "",
      data: products,
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

router.get("/category/:categoryId", async function (req, res, next) {
  try {
    const products = await model.products.findAll({
      where: {
        category_id: req.params.categoryId,
      },
    });
    res.json({
      status: "OK",
      messages: "",
      data: products,
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
    const { name, price, category_id } = req.body;
    const products = await model.products.create({
      name,
      price,
      category_id,
    });

    if (products) {
      res.status(201).json({
        status: "OK",
        messages: "Produk berhasil ditambahkan",
        data: products,
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
    const productId = req.params.id;
    const { name, price, category_id } = req.body;
    const products = await model.products.update(
      {
        name,
        price,
        category_id,
      },
      {
        where: {
          id: productId,
        },
      }
    );
    if (products) {
      res.json({
        status: "OK",
        messages: "Produk berhasil diupdate",
        data: products,
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
    const productId = req.params.id;
    const products = await model.products.destroy({
      where: {
        id: productId,
      },
    });
    if (products) {
      res.json({
        status: "OK",
        messages: "Produk berhasil dihapus",
        data: products,
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
