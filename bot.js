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
const {regexpToText} = require("nodemon/lib/utils");

function sendNewEvent(channel, pings) {
  const guild = channel.client.guilds.cache.find(guild => guild.id === process.env.GUILD_ID)
  if (guild !== undefined) {
    guild.scheduledEvents.fetch().then(events => {
      if (events.size === 0) {
        return
      }

      const nextEvent = events.at(0)
      const now = new Date()

      // if (Math.abs(nextEvent.scheduledStartAt - now) <= 60 * 60 *1000) {
      const day = nextEvent.scheduledStartAt.getDay()
      channel.send({
        content: pings[day] + " " + nextEvent.description,
        attachment: {url: nextEvent.coverImageURL({size: 4096})}
      })
      // }
    })
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

const weeklyPings = {
  2: '<@&937389346204557342> <@&898240224189120532>',
  3: '<@&937389346204557342> <@&898240224189120532>',
  0: '<@&937389346204557342>',
  4: '<@&937389346204557342>',
  6: '<@&937389346204557342>'
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

  cron.schedule('* * * * *', function () {
    sendNewEvent(eventChannel, weeklyPings)
  })
})

module.exports = client
client.login(process.env.BOT_TOKEN).catch(err => (console.log(err)))
