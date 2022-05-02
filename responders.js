const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const prefix = "$"
const { MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const { clientId, guildId, token } = require('./config.json');


client.on("messageCreate", (message) => {
    if (message.content.toUpperCase() === `TPC WELCOME`) {
      message.reply("Welcome to The Pilot Club!")
    }
  })


  client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() === `tpc website`) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('The Pilot Club Website')
            .setStyle('LINK')
            .setURL('https://www.thepilotclub.org'));
    message.reply({ content: 'The button below will take you to our website. Thank you for being a vauled member of The Pilot Club!!', components: [row]})
        }
  })

/*  client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() === "support") {
    message.reply("To get support or submit feedback, click here: https://support.thepilotclub.org/open.php  Thank you for being a valued member of The Pilot Club!!")
        }
  })
*/

  client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() === "eric") {
      message.reply("<@398557782623649794> That one guy who knew enough coding to make me a thing (with help from <@875527822611992577>). If you are seeing this message, DM him and tell him the code word || Green Horn ||")
    }
  })

  client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() === "losh") {
      message.reply("is better than you...")
    }
  })

  module.exports = client;