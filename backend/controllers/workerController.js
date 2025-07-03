const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Worker = require("../models/workerModel");

const SECRET = process.env.JWT_SECRET || "yoursecretkey";

// Register
async function registerWorker(req, res) {
  try {
    const worker = await Worker.createWorker(req.body);
    res.status(201).json(worker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
}

// Login
async function loginWorker(req, res) {
  try {
    const { email, password } = req.body;
    const worker = await Worker.getWorkerByEmail(email);
    if (!worker) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, worker.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: worker.id }, SECRET, { expiresIn: "7d" });
    res.json({
      token,
      worker: {
        id: worker.id,
        name: worker.name,
        email: worker.email,
        skill_category: worker.skill_category,
        contact_info: worker.contact_info,
        bio: worker.bio
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
}

// Get by Category
async function getWorkersByCategory(req, res) {
  try {
    const workers = await Worker.getWorkersByCategory(req.params.category);
    res.json(workers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch workers" });
  }
}

// Get by ID
async function getWorkerById(req, res) {
  try {
    const worker = await Worker.getWorkerById(req.params.id);
    res.json(worker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch worker" });
  }
}

// Update
async function updateWorker(req, res) {
  try {
    const worker = await Worker.updateWorker(req.params.id, req.body);
    res.json(worker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
}

// Get All Workers (Admin)
async function getAllWorkers(req, res) {
  try {
    const workers = await Worker.getAllWorkers();
    res.json(workers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch workers" });
  }
}

// Delete Worker by ID (Admin)
async function deleteWorkerById(req, res) {
  try {
    const deleted = await Worker.deleteWorkerById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Worker not found" });
    }
    res.json({ message: "Worker deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete worker" });
  }
}

module.exports = {
  registerWorker,
  loginWorker,
  getWorkersByCategory,
  getWorkerById,
  updateWorker,
  getAllWorkers,
  deleteWorkerById
}; 