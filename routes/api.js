var express = require("express");
var router = express.Router();
const Pets = require("../models/pets");
const Bills = require("../models/bill");
const BillDetails = require("../models/billdetails");
const upload = require("../config/common/upload");

router.post(
  "/add-pets-with-image",
  upload.array("url", 1),
  async (req, res, next) => {
    try {
      const data = req.body;
      const { files } = req;
      const urlsImage = files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
      const pet = new Pets({
        name: data.name,
        description: data.description,
        price: data.price,
        url: urlsImage,
      });
      const result = await pet.save();
      if (result) {
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/test", async (req, res) => {
  res.send("This is the test route");
});

router.get("/pet_list", async (req, res) => {
  try {
    const pets = await Pets.find();
    res.json(pets);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add_pet", async (req, res) => {
  try {
    let pet = req.body;
    await Pets.create(pet);
    let pets = await Pets.find();
    res.json(pets);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update_pet/", async (req, res) => {
  try {
    const id = req.body._id;
    let pet = req.body;
    let result = await Pets.findByIdAndUpdate(id, pet, { new: true });
    if (result) {
      let pets = await Pets.find();
      res.json(pets);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete_pet/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await Pets.findByIdAndDelete(id);
    if (result) {
      let pets = await Pets.find();
      res.json(pets);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/search_pet/:name", async (req, res) => {
  try {
    const key = req.params;
    const regex = new RegExp(key, "i");
    const data = await Pets.find({ name: regex });
    if (data) {
      res.json(data);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/cart", async (req, res) => {
  try {
    const cart = await Bills.find();
    res.json(cart);
  } catch (err) {
    res.sendStatus(err);
  }
});

router.post("/add_to_cart", async (req, res) => {
  try {
    let bill = req.body;
    await Bills.create(bill);
    let bills = await Bills.find();
    res.json(bills);
  } catch (err) {
    res.sendStatus(err);
  }
});

router.put("/update_cart/", async (req, res) => {
  try {
    const id = req.body._id;
    let bill = req.body;
    let result = await Bills.findByIdAndUpdate(id, bill, { new: true });
    if (result) {
      let bills = await Bills.find();
      res.json(bills);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(err);
  }
});

router.delete("/delete_cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await Bills.findByIdAndDelete(id);
    if (result) {
      let bills = await Bills.find();
      res.json(bills);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(err);
  }
});

router.get("/bill_details", async (req, res) => {
  try {
    const billDetails = await BillDetails.find();
    res.json(billDetails);
  } catch (err) {
    res.sendStatus(err);
  }
});

router.post("/add_bill_details", async (req, res) => {
  try {
    let billDetail = req.body;
    await BillDetails.create(billDetail);
    let billDetails = await BillDetails.find();
    res.json(billDetails);
  } catch (err) {
    res.sendStatus(err);
  }
});

router.put("/update_bill_details/", async (req, res) => {
  try {
    const id = req.body._id;
    let billDetail = req.body;
    let result = await BillDetails.findByIdAndUpdate(id, billDetail, {
      new: true,
    });
    if (result) {
      let billDetails = await BillDetails.find();
      res.json(billDetails);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(err);
  }
});

router.delete("/delete_bill_details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await BillDetails.findByIdAndDelete(id);
    if (result) {
      let billDetails = await BillDetails.find();
      res.json(billDetails);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(err);
  }
});

module.exports = router;
