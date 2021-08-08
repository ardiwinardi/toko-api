var express = require("express");
var router = express.Router();
const model = require("../models/index");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const users = await model.users.findAll({});
    res.json({
      status: "OK",
      messages: "",
      data: users,
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
    const { name, email, gender, phoneNumber } = req.body;
    const users = await model.users.create({
      name,
      email,
      gender,
      phone_number: phoneNumber,
    });

    if (users) {
      res.status(201).json({
        status: "OK",
        messages: "User berhasil ditambahkan",
        data: users,
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
    const userId = req.params.id;
    const { name, email, gender, phoneNumber } = req.body;
    const users = await model.users.update(
      {
        name,
        email,
        gender,
        phone_number: phoneNumber,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    if (users) {
      res.json({
        status: "OK",
        messages: "User berhasil diupdate",
        data: users,
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
    const userId = req.params.id;
    const users = await model.users.destroy({
      where: {
        id: userId,
      },
    });
    if (users) {
      res.json({
        status: "OK",
        messages: "User berhasil dihapus",
        data: users,
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
