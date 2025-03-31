import { Config } from "../../config/config.js";
const config = Config;

export async function sendNewQuestion(channel) {
  const question = await fetch(`${config.quizBaseUrl()}/quiz/next`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Api-Key': config.quizToken(),
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
