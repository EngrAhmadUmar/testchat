const express = require("express");
const cors = require("cors");
// const openai = require("openai");
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

async function getAiResponse(topic) {
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: topic,
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.7,
  });
  console.log(completion.data.choices[0].text);
  const answer = completion.data.choices[0].text;
  return answer;
}
// getAiResponse("write this code as a function so i can host it on localhost");

app.post("/get-answer", async (req, res) => {
  const { question } = req.body;

  const result = await getAiResponse(question);
  return res.json({ result });
});

app.listen(5000, () => {
  console.log("API server listening on port 5000");
});
