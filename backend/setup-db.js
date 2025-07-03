const pool = require("./config/db");

const createTableQuery = `
CREATE TABLE IF NOT EXISTS workers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  skill_category VARCHAR(50),
  contact_info TEXT,
  bio TEXT
);
`;

async function setupDatabase() {
  try {
    await pool.query(createTableQuery);
    console.log("Table 'workers' created or already exists.");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await pool.end();
  }
}

setupDatabase(); 