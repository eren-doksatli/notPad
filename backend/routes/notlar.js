const express = require("express");
const {
  notOlustur,
  notlarGetir,
  notGetir,
  notSil,
  notGuncelle,
} = require("../controllers/notController");

const router = express.Router();

router.get("/", notlarGetir);

//List
router.get("/:id", notGetir);

//Add
router.post("/", notOlustur);

//Delete
router.delete("/:id", notSil);

//Update
router.patch("/:id", notGuncelle);

module.exports = router;
