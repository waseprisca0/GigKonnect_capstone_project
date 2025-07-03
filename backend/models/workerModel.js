const pool = require("../config/db");
const bcrypt = require("bcrypt");

// Create Worker
async function createWorker({ name, email, password, skill_category, contact_info, bio }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO workers (name, email, password, skill_category, contact_info, bio)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, skill_category, contact_info, bio`,
    [name, email, hashedPassword, skill_category, contact_info, bio]
  );
  return result.rows[0];
}

// Get Worker by Email
async function getWorkerByEmail(email) {
  const result = await pool.query(`SELECT * FROM workers WHERE email = $1`, [email]);
  return result.rows[0];
}

// Get Workers by Category
async function getWorkersByCategory(category) {
  const result = await pool.query(`SELECT id, name, skill_category, contact_info, bio FROM workers WHERE skill_category = $1`, [category]);
  return result.rows;
}

// Get Worker by ID
async function getWorkerById(id) {
  const result = await pool.query(`SELECT id, name, skill_category, contact_info, bio FROM workers WHERE id = $1`, [id]);
  return result.rows[0];
}

// Update Worker Profile
async function updateWorker(id, { name, contact_info, bio }) {
  const result = await pool.query(
    `UPDATE workers
     SET name=$1, contact_info=$2, bio=$3
     WHERE id=$4
     RETURNING id, name, skill_category, contact_info, bio`,
    [name, contact_info, bio, id]
  );
  return result.rows[0];
}

// Get All Workers
async function getAllWorkers() {
  const result = await pool.query(
    `SELECT id, name, email, skill_category, contact_info, bio FROM workers`
  );
  return result.rows;
}

// Delete Worker by ID
async function deleteWorkerById(id) {
  const result = await pool.query(
    `DELETE FROM workers WHERE id = $1 RETURNING id`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  createWorker,
  getWorkerByEmail,
  getWorkersByCategory,
  getWorkerById,
  updateWorker,
  getAllWorkers,
  deleteWorkerById
}; 