# GigKonnect

<<<<<<< HEAD
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
=======
A platform to connect clients with trusted gig workers for various services.

## Project Link
https://gig-konnect-capstone-project.vercel.app/
---
## Video demonstration Link
https://drive.google.com/file/d/11rHuknKVeVcLTZtOfht0CEQXDG2arwd1/view?usp=sharing
---

## 🚀 Getting Started

These instructions will help you set up and run the project on your local machine.

### 1. **Clone the Repository**
```bash
git clone <your-repo-url>
cd GigKonnect_capstone_project
```

### 2. **Install Dependencies**

#### Install Frontend Dependencies
```bash
npm install
```

#### Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3. **Set Up the Database**

- Make sure you have SQLite or your preferred SQL database installed.
- Run the migration and setup scripts:

```bash
cd backend
node setup-db.js
cd ..
```

### 4. **Run the Backend Server**
```bash
cd backend
npm start
# or
node server.js
```

The backend will typically run on [http://localhost:5000](http://localhost:5000)

### 5. **Run the Frontend (React) App**
```bash
npm run dev
```

The frontend will typically run on [http://localhost:5173](http://localhost:5173)

---

## 📦 Project Structure

- `backend/` — Node.js/Express backend (API, database, authentication)
- `src/` — React frontend (components, pages, layouts)
- `public/` — Static assets

---

## 🛠️ Technologies Used
- React
- Node.js & Express
- Tailwind CSS
- Vite
- SQLite (or your preferred SQL database)

---

## 🙋‍♂️ Need Help?
If you run into any issues, please open an issue or contact the maintainer.
>>>>>>> 303b04b7ef91e11f998c7aa8868bb87b059cd6d3
