require('dotenv').config()
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildScheduledEvents]
})
const fs = require('node:fs')
const path = require('node:path')
client.setMaxListeners(0)
const monthNames = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
]
client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
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

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

// Role congrats and Charters DM
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const channel = client.channels.cache.find(channel => channel.name === 'crew-chat')
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

const cron = require('node-cron')

function sendNewEvent (channel, flight, ping) {
  const today = new Date()
  const day = today.getDate() // 24
  const month = monthNames[today.getMonth()] // may
  const year = today.getFullYear() // 2020
  channel.send({
    content: ping + ` One hour until the flight briefing. Head to the airport soon to start setting up! See you there! https://www.thepilotclub.org/dispatch/${flight}-${day}${month}${year}`,
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
  const channel = await client.channels.cache.find(channel => channel.name === 'aviation-quiz')
  const eventChannel = await client.channels.cache.find(channel => channel.name === 'crew-chat')
  // Getting random question every day:  0 57 22 * * *
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

  // EVENTS:
  // GA Tuesday
  cron.schedule('0 0 * * 2', function () {
    sendNewEvent(eventChannel, 'ga-tuesday', '<@&937389346204557342> <@&898240224189120532>')
  })
  // Bush Wednesday
  cron.schedule('0 0 22-28 * 3', function () {
    sendNewEvent(eventChannel, 'bush-wednesday', '<@&937389346204557342> <@&898240224189120532>')
  })

  // Challenge Flight
  cron.schedule('0 0 8-14 * 6', function () {
    sendNewEvent(eventChannel, 'challenge-flight', '<@&937389346204557342>')
  })

  // Fly In Thursday
  cron.schedule('0 0 * * 4', function () {
    sendNewEvent(eventChannel, 'sbr-tpc-fly-in-thursday', '<@&937389346204557342>')
  })
  // Sunday Funday
  cron.schedule('0 19 * * 0', function () {
    sendNewEvent(eventChannel, 'sunday-funday', '<@&937389346204557342>')
  })
})

module.exports = client
client.login(process.env.BOT_TOKEN).catch(err => (console.log(err)))
