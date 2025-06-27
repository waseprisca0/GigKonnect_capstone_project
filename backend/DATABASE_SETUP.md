# Database Setup Instructions

## Prerequisites
1. PostgreSQL installed on your system
2. psql command-line tool available

## Step 1: Install PostgreSQL (if not already installed)

### Windows Installation:
1. Go to https://www.postgresql.org/download/windows/
2. Download the latest PostgreSQL installer
3. Run the installer and follow the setup wizard
4. **Remember the password you set for the postgres user**
5. Keep default port (5432)

## Step 2: Create Database and Tables

### Option A: Using psql command line
1. Open Command Prompt or PowerShell
2. Navigate to the backend directory
3. Run the setup script:
   ```bash
   psql -U postgres -f setup-database.sql
   ```
4. Enter your PostgreSQL password when prompted

### Option B: Using pgAdmin (GUI)
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Name it: `gigkonnect_db`
5. Open the Query Tool
6. Copy and paste the contents of `models/schema.sql`
7. Execute the query

## Step 3: Update Environment Variables

Edit the `.env` file in the backend directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gigkonnect_db
DB_USER=postgres
DB_PASSWORD=your_actual_password_here
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

**Important:** Replace `your_actual_password_here` with the password you set during PostgreSQL installation.

## Step 4: Test the Connection

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. You should see: "Connected to PostgreSQL database" in the console

3. Test the health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```

## Troubleshooting

### Common Issues:

1. **"psql is not recognized"**
   - Add PostgreSQL bin directory to your PATH
   - Usually: `C:\Program Files\PostgreSQL\[version]\bin`

2. **"Connection refused"**
   - Make sure PostgreSQL service is running
   - Check if port 5432 is correct

3. **"Authentication failed"**
   - Double-check your password in the .env file
   - Try connecting with psql first: `psql -U postgres`

4. **"Database does not exist"**
   - Run the setup script again
   - Check if the database was created: `\l` in psql

## Verification

After setup, you should have:
- Database: `gigkonnect_db`
- Tables: `users`, `categories`, `workers`, `messages`
- Default categories inserted
- Indexes created for performance 