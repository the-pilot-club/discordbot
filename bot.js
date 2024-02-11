import {config} from "dotenv";
config()
import {Client, Collection, GatewayIntentBits, AttachmentBuilder, Events} from 'discord.js'
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildScheduledEvents]
})
import cron from 'node-cron'
import {handleInteractionCreateEvent, handleMessageCreateEvent, sendToSentry} from "./utils.js";
import {imReady} from "./events/ready.js";
import roleNotification from "./events/roles.js";
client.setMaxListeners(0)

client.eventReminders = [];
client.commands = allCommands
// client.commands = new Collection()
// const commandsPath = path.join(__dirname, 'commands')
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
//
// for (const file of commandFiles) {
//   const filePath = path.join(commandsPath, file)
//   const command = require(filePath)
//   client.commands.set(command.data.name, command)
// }
//
// client.on('interactionCreate', async interaction => {
//
// })

client.on(Events.MessageCreate, handleMessageCreateEvent)
client.on(Events.InteractionCreate, handleInteractionCreateEvent)
client.on(Events.ClientReady, imReady)
// Role congrats and Charters DM
client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
  const channel = await client.channels.cache.find(channel => channel.name === 'crew-chat')
  await roleNotification(oldMember, newMember, channel)
})
// Cron Jobs for the quiz and the event postings

async function sendNewEvent(channel, pings) {
  try {
    const guild = channel.client.guilds.cache.find(guild => {
      return guild.id === process.env.GUILD_ID
    })

    if (guild === undefined) {
      throw new Error(`guild not found in cache for guild id "${process.env.GUILD_ID}"`)
    }

    const events = await guild.scheduledEvents.fetch()

    if (events.size === 0) {
      throw new Error(`failed to fetch scheduled events for guild id "${process.env.GUILD_ID}"`)
    }

    const sortedEvents = events.sort((a, b) => a.scheduledStartAt - b.scheduledStartAt)
    const nextEvent = sortedEvents.first()
    const now = new Date()
    if (Math.abs(nextEvent.scheduledStartAt - now) <= 60 * 60 * 1000 && !channel.client.eventReminders.includes(nextEvent.id)) {
      const day = nextEvent.scheduledStartAt.getDay()
      const image = new AttachmentBuilder( nextEvent.coverImageURL({size: 4096, extension: "jpeg"}), 'event-banner.jpeg')
      if (nextEvent.image !== null) {
        channel.send({
          content: pings[day] + "\n **The event is starting in 1 hour. See you there!**\n" + nextEvent.description + "\n",
          files: [image]
        })
      } else {
        channel.send({
          content: pings[day] + "\n" + "**The event is starting in 1 hour.**\n" + nextEvent.description,
        })
      }

      channel.client.eventReminders.push(nextEvent.id)
    }
  } catch (error) {
    console.log(error)
    sendToSentry(error, 'event-ping')
  }
}


async function sendNewQuestion (channel) {
  const apiUrl = process.env.API_URL
  const question = await fetch(apiUrl)
  const questionBody = await question.json()
  channel.send(`<:training_team:895480894901592074> ${questionBody.question}\n\n🇦 ${questionBody.optionA}\n🇧 ${questionBody.optionB}\n🇨 ${questionBody.optionC}`)
    .then(message => {
      message.react('🇦')
      message.react('🇧')
      message.react('🇨')
    })
}

async function sendNewAnswer (channel) {
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

async function updateQuestion () {
  const apiUrl = process.env.NEW_QUESTION_URL
  const response = await fetch(apiUrl)
  const body = await response.json()
  console.log(body)
}

const weeklyPings = {
  2: '<@&937389346204557342> <@&898240224189120532>', //Tuesday
  3: '<@&937389346204557342> <@&898240224189120532>', // Wednesday
  0: '<@&937389346204557342>', //Sunday
  4: '<@&937389346204557342>', //Thursday
  5: '<@&937389346204557342>', //Friday
  6: '<@&937389346204557342>'  //Saturday
}

client.on(Events.ClientReady, async function () {
  const channel = await client.channels.cache.find(channel => channel.name === 'aviation-quiz')
  const eventChannel = await client.channels.cache.find(channel => channel.name === 'crew-chat')
  // Getting random question every day: 0 57 22 * * *
  // Sends Answer to current Question
  cron.schedule('0 52 13 * * *', function () { // Correct time is 0 52 13 * * *
    sendNewAnswer(channel)
  })
  // Sends an API Call to change the current question
  cron.schedule('0 58 13 * * *', function () { // Correct time is 0 58 13 * * *
    updateQuestion()
  })
  // Sends the new question.
  cron.schedule('0 00 14 * * *', function () { // Correct time is 0 00 14 * * *
    sendNewQuestion(channel)
  })

  cron.schedule('* * * * *', function () {
    sendNewEvent(eventChannel, weeklyPings)
  })
})
client.login(process.env.BOT_TOKEN).catch(err => (console.log(err)))
