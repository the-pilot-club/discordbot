import cron from "node-cron";
import { sendNewAnswer } from "./functions/sendNewAnswer.js";
import { sendNewQuestion } from "./functions/sendNewQuestion.js";
import { sendNewEvent } from "./functions/sendNewEvent.js";
import { clearEventReminders } from "../redisStore.js";
export async function cronJobs(client) {
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
    cron.schedule('0 52 13 * * *', function() { // Correct time is 0 52 13 * * *
        sendNewAnswer(channel)
    })
    // Sends the new question.
    cron.schedule('0 00 14 * * *', function() { // Correct time is 0 00 14 * * *
        sendNewQuestion(channel)
    })

    cron.schedule('* * * * *', function() {
        sendNewEvent(eventChannel, weeklyPings)
    })
    cron.schedule('0 5 * * 1', async function () {
    try {
      await clearEventReminders();
      console.log('Redis eventReminders cleared, btw the time is 12am on Monday');
    } catch (err) {
      console.error('Failed to clear Redis eventReminders:', err);
    }
    });
}
