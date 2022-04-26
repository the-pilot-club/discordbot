require('dotenv').config()

const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: 32767 });
const prefix = "$"
const { MessageActionRow, MessageButton } = require('discord.js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("messageCreate", (message) => {
    if (message.content.toUpperCase() === `TPC WELCOME`) {
      message.reply("Welcome to The Pilot Club!")
    }
  })

  client.login(process.env.BOT_TOKEN)