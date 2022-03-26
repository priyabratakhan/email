const express = require("express");

const transporter = require("../config/mail")

const Product = require("../model/product.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = req.query.page;
    const pagesize = req.query.pagesize || 10;

    const skip = (page - 1) * pagesize;
    const products = await Product.find()
      .skip(skip)
      .limit(pagesize)
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await Product.find().countDocuments()) / pagesize
    );
    return res.status(200).send({ products, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body);

        transporter.sendMail({
            from: '"amazon admin" <admin@amazon.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Your product is successfully uploaded", // Subject line
            text: "Hello sir, Your product is successfully uploaded", // plain text body
            html: "<b>Hello sir, Your product is successfully uploaded</b>", // html body
        });
        return res.status(201).send({ message: "Product uploaded succesfully" });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
        }
    });







module.exports = router;
