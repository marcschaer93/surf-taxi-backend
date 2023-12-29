const express = require("express");
const db = require("../../db/db.js");

const router = express.Router();

// export our router to be mounted by the parent application
module.exports = router;

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  res.send(rows[0]);
});

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
