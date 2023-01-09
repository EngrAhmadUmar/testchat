const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const openai = require("openai");
openai.api_key = "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";

app.post("/get-answer", async (req, res) => {
  const question = req.body.question;
  const answer = await processQuestion(question);
  res.send({ answer });
});

async function processQuestion(question) {
  const model_engine = "text-davinci-002";
  const prompt = `${question}\n`;

  const completions = await openai.completions.create({
    engine: model_engine,
    prompt: prompt,
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.5,
  });

  return completions.choices[0].text;
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
