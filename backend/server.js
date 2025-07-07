const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

const workerRoutes = require("./routes/workerRoutes");
app.use("/api/workers", workerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 