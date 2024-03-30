import { Config } from "../../config/config.js";
const config = new Config();

export async function sendNewQuestion(channel) {
  const question = await fetch(`${config.quizBaseUrl()}/api/quiz/next`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.QUIZ_TOKEN}`,
    },
  });
  const questionBody = await question.json();
  channel
    .send(
      `<:training_team:895480894901592074> ${questionBody.question}\n\n🇦 ${questionBody.optionA}\n🇧 ${questionBody.optionB}\n🇨 ${questionBody.optionC}`,
    )
    .then((message) => {
      message.react("🇦");
      message.react("🇧");
      message.react("🇨");
    });
}
