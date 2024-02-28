import {Config} from "../../config/config.js";
const config = new Config()

export async function sendNewQuestion(channel) {
    const apiUrl = config.questionsApiUrl()
    const question = await fetch(apiUrl)
    const questionBody = await question.json()
    channel.send(`<:training_team:895480894901592074> ${questionBody.question}\n\n🇦 ${questionBody.optionA}\n🇧 ${questionBody.optionB}\n🇨 ${questionBody.optionC}`)
        .then(message => {
            message.react('🇦')
            message.react('🇧')
            message.react('🇨')
        })
}