const express = require("express");
const router = express.Router();
const workerCtrl = require("../controllers/workerController");

router.post("/register", workerCtrl.registerWorker);
router.post("/login", workerCtrl.loginWorker);
router.get("/category/:category", workerCtrl.getWorkersByCategory);
router.get("/:id", workerCtrl.getWorkerById);
router.put("/:id", workerCtrl.updateWorker);
router.get("/", workerCtrl.getAllWorkers);
router.delete("/:id", workerCtrl.deleteWorkerById);

module.exports = router; 