const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { first_name, last_name, email, password_hash, phone, user_type, is_admin } = userData;
    
    const query = `
      INSERT INTO users (first_name, last_name, email, password_hash, phone, user_type, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, first_name, last_name, email, phone, user_type, is_admin, created_at
    `;
    
    const values = [first_name, last_name, email, password_hash, phone, user_type, is_admin || false];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const query = 'SELECT id, first_name, last_name, email, phone, user_type, is_admin, created_at FROM users WHERE id = $1';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const query = 'SELECT id, first_name, last_name, email, phone, user_type, is_admin, created_at FROM users ORDER BY created_at DESC';
    
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async updateProfile(id, updateData) {
    const { first_name, last_name, phone } = updateData;
    
    const query = `
      UPDATE users 
      SET first_name = $1, last_name = $2, phone = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING id, first_name, last_name, email, phone, user_type, created_at, updated_at
    `;
    
    const values = [first_name, last_name, phone, id];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User; 