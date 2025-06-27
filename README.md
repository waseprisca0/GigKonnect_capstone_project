# GigKonnect

GigKonnect is a fullstack web platform that connects clients with gig workers (such as nannies, cooks, mechanics, drivers, and electricians). The platform allows users to register as clients or workers, manage profiles, and enables admin users to manage all users. Built with React (frontend), Node.js/Express (backend), and PostgreSQL (database).

## Features
- User registration and login
- Worker onboarding (profile creation for workers)
- Admin dashboard for user management (view, create, delete users)
- Responsive, modern UI

## App Interface

### Login Page
![Login Page](screenshots/login%20page.png)

### Landing Page
![Landing Page](screenshots/landing%20page.png)

### Services Page
![Services Page](screenshots/services%20page.png)

---

## Selected Code Snippets

### Frontend (React): Conditional Navbar Link
```jsx
// src/components/Navbar.jsx
{!user?.isWorker && (
  <Link to="/register-worker" className="text-blue-500">Want to register as a worker?</Link>
)}
```

### Backend (Express): Admin Route to List Users
```js
// backend/routes/admin.js
router.get('/users', adminMiddleware, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
```

### Database Schema (PostgreSQL)
```sql
-- backend/models/schema.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  is_admin BOOLEAN DEFAULT FALSE,
  type VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Local Deployment Process

1. **Clone the repository:**
   ```bash
   git clone https://github.com/waseprisca0/GigKonnect_capstone_project.git
   cd GigKonnect_capstone_project
   ```
2. **Install dependencies:**
   - For the frontend:
     ```bash
     npm install
     ```
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
3. **Set up the database:**
   - Ensure PostgreSQL is running locally.
   - Create a database and update the connection details in `backend/config/database.js` or `.env`.
   - Run the setup script:
     ```bash
     npm run setup-db
     ```
4. **Start the backend server:**
   ```bash
   npm start
   ```
5. **Start the frontend (in a new terminal):**
   ```bash
   npm run dev
   ```
6. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

---

## Infrastructure Used for Local Hosting
- **Frontend:** Vite + React, running locally on port 5173
- **Backend:** Node.js/Express, running locally on port 5000
- **Database:** PostgreSQL, running locally (default port 5432)

All services are hosted and run locally on your development machine for testing and development purposes.

---

## License
MIT
