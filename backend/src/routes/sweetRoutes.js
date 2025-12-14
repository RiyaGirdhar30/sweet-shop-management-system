const express = require("express");
const Sweet = require("../models/Sweet");
const protect = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/adminMiddleware");

const router = express.Router();

/**
 * GET ALL SWEETS (PUBLIC)
 */
router.get("/", async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
});

/**
 * ADD SWEET (ADMIN ONLY)
 */
router.post("/", protect, adminOnly, async (req, res) => {
  const sweet = await Sweet.create(req.body);
  res.status(201).json(sweet);
});

/**
 * DELETE SWEET (ADMIN ONLY)
 */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: "Sweet deleted" });
});

/**
 * PURCHASE SWEET (USER / AUTHENTICATED)
 */
router.post("/:id/purchase", protect, async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet || sweet.quantity === 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  res.json(sweet);
});

module.exports = router;
