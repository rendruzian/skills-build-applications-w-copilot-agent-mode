import express from "express";
import mongoose from "mongoose";

const PORT = process.env.PORT ?? 8000;
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/octofit-tracker";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend", error);
    process.exit(1);
  }
}

start();
