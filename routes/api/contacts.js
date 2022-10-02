const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const {
  authenticate,
  vallidationBody,
  isValidId,
} = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers/");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, vallidationBody(schemas.addScheme), ctrl.add);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeById)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  vallidationBody(schemas.addScheme),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  vallidationBody(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
