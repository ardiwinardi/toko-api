"use strict";
const slugify = require("slugify");
const faker = require("faker");
const model = require("../models/index");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const images = [
  "https://ik.imagekit.io/duogwqkwlvc/product-52a8bd82-f5a0-11eb-8ac3-fdb820fd4276_ygKV0bzWT.jpeg",
  "https://ik.imagekit.io/duogwqkwlvc/product-67aa89e0-f5a0-11eb-9329-6748f6021745_kOIDOSfLVY.jpeg",
  "https://ik.imagekit.io/duogwqkwlvc/product-5c6bc210-f5a0-11eb-9590-a15972dd1aa7_btTryR6voZ.jpeg",
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await model.categories.findAll({});

    const products = [...Array(10)].map(() => {
      let name = faker.commerce.productName();
      return {
        id: faker.datatype.uuid(),
        name: name,
        price: faker.commerce.price(),
        image: images[getRandomInt(images.length)],
        slug: slugify(name),
        category_id: categories[getRandomInt(categories.length)].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return queryInterface.bulkInsert("products", products, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  },
};
