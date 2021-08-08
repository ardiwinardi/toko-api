var express = require("express");
var router = express.Router();
const model = require("../models/index");

/* GET carts listing. */
router.get("/", async function (req, res, next) {
  try {
    const carts = await model.carts.findAll({});
    res.json({
      status: "OK",
      messages: "",
      data: carts,
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
    const { customer_id, product_id, order_id, quantity, status } = req.body;
    const carts = await model.carts.create({
      customer_id,
      product_id,
      order_id,
      quantity,
      status,
    });

    if (carts) {
      res.status(201).json({
        status: "OK",
        messages: "Keranjang berhasil ditambahkan",
        data: carts,
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
    const cartId = req.params.id;
    const { customer_id, product_id, order_id, quantity, status } = req.body;
    const carts = await model.carts.update(
      {
        customer_id,
        product_id,
        order_id,
        quantity,
        status,
      },
      {
        where: {
          id: cartId,
        },
      }
    );
    if (carts) {
      res.json({
        status: "OK",
        messages: "Keranjang berhasil diupdate",
        data: carts,
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
    const cartId = req.params.id;
    const carts = await model.carts.destroy({
      where: {
        id: cartId,
      },
    });
    if (carts) {
      res.json({
        status: "OK",
        messages: "Keranjang berhasil dihapus",
        data: carts,
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
