# GigKonnect

A platform to connect clients with trusted gig workers for various services.

## Project Link
https://gig-konnect-capstone-project-a9m4j1ode.vercel.app/
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
