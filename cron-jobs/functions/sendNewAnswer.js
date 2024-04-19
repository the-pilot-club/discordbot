import { Config } from "../../config/config.js";
const config = Config;
export async function sendNewAnswer(channel) {
  const answer = await fetch(`${config.quizBaseUrl()}/api/quiz/current`)
  const answerBody = await answer.json();
  switch (answerBody.correctAnswer) {
    case "A":
      channel.send(
        `<:training_team:895480894901592074> The correct answer is ||🇦 ${answerBody.optionA}||`,
      );
      break;
    case "B":
      channel.send(
        `<:training_team:895480894901592074> The correct answer is ||🇧 ${answerBody.optionB}||`,
      );
      break;
    case "C":
      channel.send(
        `<:training_team:895480894901592074> The correct answer is ||🇨 ${answerBody.optionC}||`,
      );
      break;
  }
}
