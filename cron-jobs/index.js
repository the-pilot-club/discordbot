import cron from "node-cron";
import {sendNewAnswer} from "./functions/sendNewAnswer.js";
import {sendNewQuestion} from "./functions/sendNewQuestion.js";
import {sendNewEvent} from "./functions/sendNewEvent.js";
export async function cronJobs(client){
    const channel = await client.channels.cache.find(channel => channel.name === 'aviation-quiz')
    const eventChannel = await client.channels.cache.find(channel => channel.name === 'crew-chat')
    const weeklyPings = {
        2: '<@&937389346204557342> <@&898240224189120532>', //Tuesday
        3: '<@&937389346204557342> <@&898240224189120532>', // Wednesday
        0: '<@&937389346204557342>', //Sunday
        4: '<@&937389346204557342>', //Thursday
        5: '<@&937389346204557342>', //Friday
        6: '<@&937389346204557342>'  //Saturday
    }
// Getting random question every day: 0 57 22 * * *
// Sends Answer to current Question
    cron.schedule('0 52 11 * * *', function () { // Correct time is 0 52 13 * * *
        sendNewAnswer(channel)
    })
// Sends the new question.
    cron.schedule('0 00 12 * * *', function () { // Correct time is 0 00 14 * * *
        sendNewQuestion(channel)
    })

    cron.schedule('* * * * *', function () {
        sendNewEvent(eventChannel, weeklyPings)
    })
}
