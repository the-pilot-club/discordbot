require('dotenv').config()

const { Client, Collection, Intents, Interaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS] });
const prefix = "$"
const { MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const { clientId, guildId, token } = require('./config.json');
const fetch = require('node-fetch');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

client.setMaxListeners(0);


for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const { commandName } = interaction;
  
    if (commandName === 'ping') {
      await interaction.reply('Pong!');
    } else if (commandName === 'server') {
      await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
      await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    } else if (commandName === 'metar') {
      const airport = interaction.options.getString('airport')
      const response = await fetch(`https://metar.vatsim.net/metar.php?id=${airport}`);
      const body = await response.text();
      interaction.reply(body)
    } else if (commandName === 'atis') {
      const airport = interaction.options.getString('airport')
      const response = await fetch(`https://datis.clowd.io/api/${airport}`);
      const body = await response.text();
      interaction.reply(body)
    }
  });

  //commuter role
  client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if(oldMember.roles.cache.has('930863426224410684')) return;
    if(newMember.roles.cache.has('930863426224410684')) {
      const channel = client.channels.cache.get('830209982770708500');
      channel.send(`Join us in congratulating ${oldMember} with achieving <@&930863426224410684> status at TPC!`);
    }
    })

//frequent flyer
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  if(oldMember.roles.cache.has('855253377209204750')) return;
  if(newMember.roles.cache.has('855253377209204750')) {
    const channel = client.channels.cache.get('830209982770708500');
    channel.send(`Join us in congratulating ${oldMember} with achieving <@&855253377209204750> status at TPC!`);
  }
  })

//VIP
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  if(oldMember.roles.cache.has('930863007372836876')) return;
  if(newMember.roles.cache.has('930863007372836876')) {
    const channel = client.channels.cache.get('830209982770708500');
    channel.send(`Join us in congratulating ${oldMember} with achieving <@&930863007372836876> status at TPC!`);
  }
  })
//Booster
  client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if(oldMember.roles.cache.has('838504056358961164')) return;
    if(newMember.roles.cache.has('838504056358961164')) {
      const channel = client.channels.cache.get('830209982770708500');
      channel.send(`${oldMember} Thank you for boosting the club!`);
    }
    })

// q and a funtion

const file = require("./questions.json")
const cron = require('node-cron'); //ability to repeat code
const { EventEmitter } = require('stream');

function randomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function sendNewQuestion(channel) {
  let generatedNum = randomNum(0,questions.length)
  channel.send(questions[generatedNum][0]).then (message => {
    message.react('🇦');
    message.react('🇧');
    message.react('🇨');

  });
  file.latestQuestion = generatedNum
  fs.writeFileSync("questions.json", JSON.stringify(file, null, 2));
}
function sendNewAnswer(channel) {
  channel.send(questions[file.latestQuestion][1]);
}

//Parsing questions
let questions = file.questions;
//Getting random question
let index=randomNum(0,questions.length-1);
let question=questions[index];

//sends message to a specific channel
client.on('ready', async function() {
  const channel = await client.channels.fetch(process.env.CHANNEL_ID);
//Getting random question every day:  0 57 22 * * *
  cron.schedule('0 00 08 * * *', function() { //Correct time is 0 00 08 * * *
    sendNewQuestion(channel);
  });
  cron.schedule('0 53 07 * * *', function() { // Correct time is 0 53 07 * * *
    sendNewAnswer(channel);
  });
});


module.exports = client;

client.login(process.env.BOT_TOKEN)
