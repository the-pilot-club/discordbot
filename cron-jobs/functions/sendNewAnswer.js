export async function sendNewAnswer(channel) {
    const apiUrl = process.env.API_URL
    const answer = await fetch(apiUrl)
    const answerBody = await answer.json()
    switch (answerBody.correctAnswer) {
        case 'A':
            channel.send(`<:training_team:895480894901592074> The correct answer is ||🇦 ${answerBody.optionA}||`)
            break
        case 'B':
            channel.send(`<:training_team:895480894901592074> The correct answer is ||🇧 ${answerBody.optionB}||`)
            break
        case 'C':
            channel.send(`<:training_team:895480894901592074> The correct answer is ||🇨 ${answerBody.optionC}||`)
            break
    }
}