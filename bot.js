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
var monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

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
    } else if (commandName === 'membercount') {
      await interaction.reply(`Total members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
      await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    } else if (commandName === 'poll') {
      const question = interaction.options.getString('question')
      var answer_a = interaction.options.getString('answer_a')
      var answer_b = interaction.options.getString('answer_b')
      var answer_c = interaction.options.getString('answer_c')
      if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')){
      toSend = {
        "type": "rich",
        "title": `TPC Poll!`,
        "description": question,
        "color": 0X37B6FF,
        "fields": [
          {
            "name": `🇦:`,
            "value": answer_a,
            "inline": false
          },
          {
            "name": `🇧:`,
            "value": answer_b,
            "inline": false
          },
          {
            "name": `🇨:`,
            "value": answer_c,
            "inline": false
          }
        ],
        "footer": {
          "text": `Made by The Pilot Club`
        }
      }
      const message = await interaction.reply({ embeds: [toSend], fetchReply: true });
      message.react('🇦')
        .then(() => message.react('🇧'))
        .then(() => message.react('🇨'))
        .catch(error => console.error('One of the emojis failed to react:', error));
      } else {
        await interaction.reply("You need to be staff to use /poll!")
      }

    } else if (commandName === 'next-flight') {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel('Next TPC Group Flight')
          .setURL("https://thepilotclub.org/dispatch")
          .setStyle('LINK'),
        ) ;
      await interaction.reply({content:`Next TPC Group Flight:`, components: [row]})
      } else if (commandName === 'server-commands') {
        const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setLabel('TPC Server Commands')
            .setURL("https://www.thepilotclub.org/server-commands")
            .setStyle('LINK'),
          ) ;
        await interaction.reply({content:`Here is a full list of member friendly commands:`, components: [row]})
      } else if (commandName === 'leaderboard') {
        const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setLabel('TPC Leaderboard')
            .setURL("https://mee6.xyz/thepilotclub")
            .setStyle('LINK'),
          ) ;
        await interaction.reply({content:`Check out our leaderboard!`, components: [row]})
    } else if (commandName === 'metar') {
      const airport = interaction.options.getString('airport')
      const response = await fetch(`https://metar.vatsim.net/metar.php?id=${airport}`);
      const body = await response.text();
      if (body != undefined){
        var metarEmbed =
        {
          "type": "rich",
          "title": `WEATHER REPORT`,
          "description": airport.toUpperCase(),
          "color": 0X37B6FF,
          "fields": [
            {
              "name": `METAR`,
              "value": body
            }
          ],
          "footer": {
            "text": `Made by The Pilot Club`
          }
        }
      interaction.reply({ embeds: [metarEmbed] })
      //interaction.reply(body)
        //test
    } else {
      interaction.reply("METAR isn't posted for: " + airport)
    }
    } else if (commandName === 'airport') {
      const airport = interaction.options.getString('airport')
      const response = await fetch(`https://metar.vatsim.net/metar.php?id=${airport}`);
      const body = await response.text();
      
      let airportEmbed =
        {
          "type": "rich",
          "title": `Airport`,
          "description": `Information about ${airport.toUpperCase()}`,
          "color": 0X37B6FF,
          "fields": [
            {
              "name": `CHARTS (AirNav)`,
              "value": `https://www.airnav.com/airport/${airport}`
            },
            {
              "name": `METAR`,
              "value": body || "Not available"
            }
          ],
          "footer": {
            "text": `Made by The Pilot Club`
          }
        }
      
    
      interaction.reply({ embeds: [airportEmbed] })
    } else if (commandName === 'charts') {
    const airport = interaction.options.getString('airport')
    const response = await fetch(`https://metar.vatsim.net/metar.php?id=${airport}`);
    const body = await response.text();
    
    let chartsEmbed =
      {
        "type": "rich",
        "title": `Airport`,
        "description": `Information about ${airport.toUpperCase()}`,
        "color": 0X37B6FF,
        "fields": [
          {
            "name": `CHARTS (AirNav)`,
            "value": `https://www.airnav.com/airport/${airport}`
          },
          {
            "name": `METAR`,
            "value": body || "Not available"
          }
        ],
        "footer": {
          "text": `Made by The Pilot Club`
        }
      }
    
  
    interaction.reply({ embeds: [chartsEmbed] })
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
function sendNewEvent(channel, flight, ping) {
  const today = new Date();
  const day = today.getDate();        // 24
  const month = monthNames[today.getMonth()] //may
  const year = today.getFullYear();   // 2020
  channel.send({
    content: ping + ` One hour until the flight briefing. Head to the airport in 30 min to start setting up! See you there! https://www.thepilotclub.org/dispatch/${flight}-${day}${month}${year}`,
    files: [{
      attachment: `./pics/${flight}.png`,
      name: 'file.png'
    }]
  })
  //channel.send(`<@&838379351295787079> Pilots, one hour until the Event Briefing. Start heading to the airport in 30 minutes to start setting up! See you there!`)
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
  cron.schedule('0 52 07 * * *', function() { // Correct time is 0 53 07 * * *
    sendNewAnswer(channel);
  });

  //EVENTS:
  const eventChannel = await client.channels.fetch(process.env.EVENT_CHANNEL);
  //sendNewEvent(eventChannel, "ga-tuesday", "<@&937389346204557342> <@&898240224189120532>");
  cron.schedule('0 17 * * 2', function() {
    sendNewEvent(eventChannel, "ga-tuesday", "<@&937389346204557342> <@&898240224189120532>");
  });
  cron.schedule('0 18 * * 4', function() {
    sendNewEvent(eventChannel, "sbr-tpc-fly-in-thursday", "<@&937389346204557342>");
  });
  cron.schedule('0 13 * * 0', function() { 
    sendNewEvent(eventChannel, "sunday-funday", "<@&937389346204557342>");
  }); 
  cron.schedule('0 10 * * 6', function() { // every saturday
  const today = new Date();
  const day = today.getDate();        // 24
  if (day <= 7){
  const month = monthNames[today.getMonth()] //may
  const year = today.getFullYear();   // 2020
  channel.send({
    content: `<@&937389346204557342> STARTING SOON: JOIN US for WORLD TOUR. Head to the airport in 30 min to start setting up! See you there! https://www.thepilotclub.org/dispatch/world-tour-${day}${month}${year}`,
    files: [{
      attachment: `./pics/world-tour.png`,
      name: 'file.png'
    }]
  })
  } else {
    console.log("not first saturday of the month")
  }

  });
  cron.schedule('0 14 * * 6', function() { // every saturday
    const today = new Date();
    const day = today.getDate();        // 24
    if (day > 7 && day <=14){
      //second saturday of the month
      sendNewEvent(eventChannel, "challengeflight", "<@&937389346204557342>");
  } else {
    console.log("not second saturday of the month")
  }
  
    });
    cron.schedule('0 11 * * 6', function() { // every saturday
      const today = new Date();
      const day = today.getDate();        // 24
      if (day > 14 && day <=21){
        //third saturday of the month
        sendNewEvent(eventChannel, "15zulu", "<@&937389346204557342>");
    } else {
      console.log("not third saturday of the month")
    }
    
      });

});


module.exports = client;

client.login(process.env.BOT_TOKEN)
