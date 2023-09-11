import express from "express";
import { Char } from "../models/Char.js";
const router = express.Router();
// get All Chars
router.get("/", async (req, res) => {
  try {
    const chars = await Char.find({});
    return res.status(200).json({
      count: chars.length,
      data: chars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// get a single char by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const char = await Char.findById(id);
    return res.status(200).json(char);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// add a new char
router.post("/", async (req, res) => {
  try {
    const { name, show, imgLink } = req.body;
    if (!name || !show || !imgLink) {
      return res.status(400).send({ message: "all fields are required" });
    }
    const newChar = { name, show, imgLink };
    const char = await Char.create(newChar);
    return res.status(201).send(char);
  } catch (error) {
    console.log(error);
  }
});
// update a char
router.put("/:id", async (req, res) => {
  try {
    const { name, show, imgLink } = req.body;
    if (!name || !show || !imgLink) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }
    const { id } = req.params;
    const result = await Char.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Char Not Found" });
    }
    return res.status(200).send(`Char ${result.name} updated successfully`);
  } catch (error) {
    console.log(error);
  }
});
// delete a Char
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Char.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Char not found" });
    }
    return res.status(200).send({ message: "Char Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
});
export default router;
