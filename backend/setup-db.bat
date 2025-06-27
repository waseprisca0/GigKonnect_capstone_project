@echo off
echo ========================================
echo GigKonnect Database Setup
echo ========================================
echo.

echo Step 1: Checking if PostgreSQL is installed...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: PostgreSQL is not installed or not in PATH
    echo Please install PostgreSQL from: https://www.postgresql.org/download/windows/
    echo After installation, add PostgreSQL bin to your PATH
    echo Usually: C:\Program Files\PostgreSQL\[version]\bin
    pause
    exit /b 1
)

echo PostgreSQL found!
echo.

echo Step 2: Creating database and tables...
echo Please enter your PostgreSQL password when prompted:
psql -U postgres -f setup-database.sql

if %errorlevel% neq 0 (
    echo ERROR: Database setup failed
    echo Please check your PostgreSQL installation and password
    pause
    exit /b 1
)

echo.
echo Step 3: Creating .env file...
if not exist .env (
    copy env.example .env
    echo Created .env file from template
    echo IMPORTANT: Please edit .env file with your actual PostgreSQL password
) else (
    echo .env file already exists
)

echo.
echo ========================================
echo Database setup completed!
echo ========================================
echo.
echo Next steps:
echo 1. Edit backend/.env file with your PostgreSQL password
echo 2. Start the backend server: npm run dev
echo 3. Test the connection
echo.
pause 