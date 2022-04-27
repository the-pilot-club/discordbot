const client = require('./bot.js')
client.on("messageCreate", (message) => {
    if (message.content.toUpperCase() === `TPC WELCOME`) {
      message.reply("Welcome to The Pilot Club!")
    }
  })