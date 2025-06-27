const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'gigkonnect_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password_here'
});

async function createTestUsers() {
  try {
    // Test Client
    const clientPassword = await bcrypt.hash('client123', 10);
    const clientQuery = `
      INSERT INTO users (first_name, last_name, email, password_hash, phone, user_type)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email;
    `;
    
    const clientResult = await pool.query(clientQuery, [
      'John',
      'Client',
      'client@test.com',
      clientPassword,
      '+1234567890',
      'client'
    ]);

    // Test Worker
    const workerPassword = await bcrypt.hash('worker123', 10);
    const workerQuery = `
      INSERT INTO users (first_name, last_name, email, password_hash, phone, user_type)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email;
    `;
    
    const workerResult = await pool.query(workerQuery, [
      'Sarah',
      'Worker',
      'worker@test.com',
      workerPassword,
      '+0987654321',
      'worker'
    ]);

    // Test Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminQuery = `
      INSERT INTO users (first_name, last_name, email, password_hash, phone, user_type, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email;
    `;
    await pool.query(adminQuery, [
      'Admin',
      'User',
      'admin@gigkonnect.com',
      adminPassword,
      '+1111111111',
      'client',
      true
    ]);

    console.log('✅ Test users created successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('👤 Client:');
    console.log('   Email: client@test.com');
    console.log('   Password: client123');
    console.log('\n👷 Worker:');
    console.log('   Email: worker@test.com');
    console.log('   Password: worker123');
    console.log('\n🛡️ Admin:');
    console.log('   Email: admin@gigkonnect.com');
    console.log('   Password: admin123');
    console.log('\n🔗 You can now test login functionality in your app!');

  } catch (error) {
    console.error('❌ Error creating test users:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. PostgreSQL is installed and running');
    console.log('   2. Database is created (run setup-database.sql)');
    console.log('   3. .env file has correct database credentials');
  } finally {
    await pool.end();
  }
}

createTestUsers(); 