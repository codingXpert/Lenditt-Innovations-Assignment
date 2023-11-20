const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/sync-contacts", userController.syncContact);
router.get("/find-common-users", userController.findCommonUser);
router.get("/getContactById", userController.getContactById);

module.exports = router;