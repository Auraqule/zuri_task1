import express from "express";
import cors from "cors";

// APP CONFIG
const app = express();

const PORT = process.env.PORT || 8000;

const TRAINING_COMPANY = "HNG9";
const YEAR = "2022";

// About Me: My Info 🤗
const slackUsername = "Auraqule";
const name = "Christian Peters";
const post = "Software Engineer";
const currentEngagement = `Currently receiving backend internship trainig with ${TRAINING_COMPANY}, Year: ${YEAR}`;

const messageBody = {
  slackUsername: slackUsername,
  backend: true,
  age: 25,
  bio: `My name is ${name}, and I am a ${post} ☺, ${currentEngagement} `,
};

const OPERATION_TYPE = {
  OPERATION_1: "addition",
  OPERATION_2: "subtraction",
  OPERATION_3: "multiplication",
};

// STAGE 2 BONUS SOLUTION 😋

// **************************************************
// 🤔 LIKELY ADDITION KEYWORDS
const additionOptions = [
  "add",
  "sum",
  "plus",
  "aggregate",
  "join",
  "merge",
  "increase",
  "inc",
  "increment",
  "+",
];
// 🤔 LIKELY SUBTRACTION KEYWORDS
const subtractionOptions = [
  "subtract",
  "minus",
  "remove",
  "take-away",
  "takeaway",
  "deduct",
  "decrement",
  "decrease",
  "dec",
  "reduce",
  "-",
];
// 🤔 LIKELY MULTIPLICATION KEYWORDS
const multiplicationOptions = [
  "product",
  "multiply",
  "mult",
  "mul",
  "times",
  "x",
  "*",
];

// **************************************************

// MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: "*" }));

// DB CONFIG

// API ROUTES/ENDPOINTS

app.get("/", (req, res) => {
  res.status(200).send({ ...messageBody });
});
app.post("/arithmetic", (req, res) => {
  const operation_type = req.body.operation_type.toLowerCase();
  const x = req.body.x;
  const y = req.body.y;
  const operation_type_ADD_checker = additionOptions.some((d) =>
    operation_type.includes(d)
  );
  const operation_type_SUB_checker = subtractionOptions.some((d) =>
    operation_type.includes(d)
  );
  const operation_type_MUL_checker = multiplicationOptions.some((d) =>
    operation_type.includes(d)
  );

  // 👇 THIS IS REPONSIBLE FOR THE ACTUAL USER ARITHMETIC COMPUTATION
  const result =
    operation_type === OPERATION_TYPE.OPERATION_1 || operation_type_ADD_checker
      ? x + y
      : operation_type === OPERATION_TYPE.OPERATION_2 ||
        operation_type_SUB_checker
      ? x - y
      : x * y;

  //  👇 EXTRACT/CHECKS FOR THE ACTUAL USER OPERATION either DIRECTLY or in form of  a WORD
  const operation_type_checker =
    operation_type === OPERATION_TYPE.OPERATION_1 || operation_type_ADD_checker
      ? OPERATION_TYPE.OPERATION_1
      : operation_type === OPERATION_TYPE.OPERATION_2 ||
        operation_type_SUB_checker
      ? OPERATION_TYPE.OPERATION_2
      : OPERATION_TYPE.OPERATION_3;

  // 👇 THIS IS THE RESPONSE BODY BEING SENT BACK TO THE USER
  const responseBody = {
    slackUsername: slackUsername,
    operation_type: operation_type_checker,
    result,
  };
  res.status(200).send({ ...responseBody });
});

// LISTERNER
app.listen(PORT, () => console.log(`Listening on Localhost:${PORT}`));
