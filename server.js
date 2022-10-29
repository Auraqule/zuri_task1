import express from "express";
import cors from "cors";

// APP CONFIG
const app = express();

const PORT = process.env.PORT || 8000;

const messageBody = {
  slackUsername: "Auraqule",
  backend: true,
  age: 25,
  bio: "My name is Christian Peters, and I am a Backend Engineer ",
};

// MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: "*" }));

// DB CONFIG

// API ROUTES/ENDPOINTS

app.get("/", (req, res) => {
  res.status(200).send({ ...messageBody });
});

// LISTERNER
app.listen(PORT, () => console.log(`Listening on Localhost:${PORT}`));
