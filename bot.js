import dotenv from 'dotenv'
import Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'
import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { schedule } from 'node-cron'
import commands from './commands/index.js'
import events from './events/index.js'
import eventsCrons from "./eventsCrons.js";

dotenv.config()

let  guildConstants;

guildConstants = import("./env-constants/dev_constants.js").default

if (process.env.NODE_ENV !== "dev") {
  guildConstants = import("./env-constants/prod_constants.js").default
}

Sentry.init({
  dsn: 'https://cca48e5c953b5ff7a895fbb6d8caaa5c@o4505802902863872.ingest.sentry.io/4505813582807040',
  integrations: [
    new ProfilingIntegration()
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0 // Capture 100% of the transactions, reduce in production!
})

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildScheduledEvents]
})

client.setMaxListeners(0)

client.commands = new Collection()

/** @type {Object<string, Command>} */
for (const commandName in commands) {
  /** @type Command */
  const command = commands[commandName]
  client.commands.set(command.data.name, command)
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'There was an error while executing this command! Please let Eric | ZSE | TPC76 know ASAP so that a fix can occur!' +
        '\n \nIf this is the booking or PIREP Command, please un-archive the channel as this is the reason you are getting this error',
      ephemeral: true
    }).catch(err => (console.log(err)))
  }
})

/** @type import('./events/index.js').default */
for (const eventName in events) {
  const event = events[eventName]
  if (!event.once) {
    client.on(event.name, (...args) => event.execute(...args))
    continue
  }

  client.once(event.name, (...args) => event.execute(...args))
}

// Role congrats and Charters DM
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const channel = client.channels.
  if (oldMember.roles.cache.has(process.env.COMMUTER_ROLE)) return
  if (newMember.roles.cache.has(process.env.COMMUTER_ROLE)) {
    channel.send({
      content: `Join us in congratulating ${oldMember} with achieving <@&930863426224410684> status at TPC! You are now part of the TPC **COMPANY PERKS** Program!`,
      files: [{ attachment: './pics/congrats.png', name: 'file.png' }]
    })
  }
})
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const channel = client.channels.cache.find(channel => channel.name === 'crew-chat')
  if (oldMember.roles.cache.has(process.env.FREQUENTFLIER_ROLE)) return
  if (newMember.roles.cache.has(process.env.FREQUENTFLIER_ROLE)) {
    channel.send({
      content: `Join us in congratulating ${oldMember} with achieving <@&855253377209204750> status at TPC! You are now part of the TPC **COMPANY PERKS** Program!`,
      files: [{ attachment: './pics/congrats.png', name: 'file.png' }]
    })
  }
})
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const channel = client.channels.cache.find(channel => channel.name === 'crew-chat')
  if (oldMember.roles.cache.has(process.env.VIP_ROLE)) return
  if (newMember.roles.cache.has(process.env.VIP_ROLE)) {
    channel.send({
      content: `Join us in congratulating ${oldMember} with achieving <@&930863007372836876> status at TPC! You are now part of the TPC **COMPANY PERKS** Program!`,
      files: [{ attachment: './pics/congrats.png', name: 'file.png' }]
    })
  }
  if (oldMember.roles.cache.has(process.env.BOOSTER_ROLE)) return
  if (newMember.roles.cache.has(process.env.BOOSTER_ROLE)) {
    channel.send(`${oldMember} Thank you for boosting the club!`)
  }
})

// Cron Jobs for the quiz and the event postings
function sendNewEvent (channel, flight, ping) {
  channel.send({
    content: ping + ` One hour until the flight briefing. Head to the airport soon to start setting up! See you there! https://www.thepilotclub.org/dispatch/${flight}-${new Date().toLocaleDateString('en-GB').replaceAll("/", "")}`,
    files: [{ attachment: `./pics/${flight}.png`, name: 'file.png' }]
  })
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
      channel.send(`<:training_team:895480894901592074> The correct answer is 🇦 ${answerBody.optionA}`)
      break
    case 'B':
      channel.send(`<:training_team:895480894901592074> The correct answer is 🇧 ${answerBody.optionB}`)
      break
    case 'C':
      channel.send(`<:training_team:895480894901592074> The correct answer is 🇨 ${answerBody.optionC}`)
      break
  }
}

async function updateQuestion () {
  const apiUrl = process.env.NEW_QUESTION_URL
  const response = await fetch(apiUrl)
  const body = await response.json()
  console.log(body)
}

client.on('ready', async function () {
  const channel = await client.channels.get(guildConstants)
  const eventChannel = await client.channels.cache.find(channel => channel.name === 'crew-chat')
  // Getting random question every day:  0 57 22 * * *
  // Sends Answer to current Question
  schedule('0 52 12 * * *', function () { // Correct time is 0 52 07 * * *
    sendNewAnswer(channel)
  })
  // Sends an API Call to change the current question
  schedule('0 58 12 * * *', function () { // Correct time is 0 58 07 * * *
    updateQuestion()
  })
  // Sends the new question.
  schedule('0 00 13 * * *', function () { // Correct time is 0 00 08 * * *
    sendNewQuestion(channel)
  })

  // EVENTS:
 for (const event of eventsCrons) {
  schedule(event.schedule, function() {
    sendNewEvent(eventChannel, event.flightName, event.ping);
  });
 }
});
client.login(process.env.BOT_TOKEN).catch(err => (console.log(err)))
