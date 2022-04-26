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

  client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() === `tpc website`) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('The Pilot Club Website')
            .setStyle('LINK')
            .setURL('https://www.thepilotclub.org'));
    message.reply({ content: 'This is the website of The Pilot Club. They Are Great People', components: [row]})
        }
  })

  
  client.login(process.env.BOT_TOKEN)