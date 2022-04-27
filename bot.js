require('dotenv').config()

const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: 32767 });
const prefix = "$"
const { MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('XPlane 11' , {type: "PLAYING"})
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
    message.reply({ content: 'The button below will take you to our website. Thank you for being a vauled member of The Pilot Club!!', components: [row]})
        }
  })

  client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() === "support") {
    message.reply("To get support or submit feedback, click here: https://support.thepilotclub.org/open.php  Thank you for being a vauled member of The Pilot Club!!")
        }
  })


  client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() === "eric") {
      message.reply("<@398557782623649794> That one guy who knew enough coding to make me a thing (with help from <@875527822611992577>). If you are seeing this message, DM him and tell him the code word || Green Horn ||")
    }
  })


// q and a funtion
//const fs = require('fs'); //ability to read files
const file = require("./questions.json")
const cron = require('node-cron'); //ability to repeat code   

function randomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//Parsing questions
let questions = file.questions;
//Getting random question
console.log(questions[randomNum(0,14)][0])

//sends message to a specific channel
client.on('ready', async function() {
  const channel = await client.channels.fetch('864834861603487754');
  channel.send('The Bot has Restarted or has been 24 hours. Who knows? I dont.');
//Getting random question every day at 8am
cron.schedule('0 8 * * *', function() {
  let generatedNum = randomNum(0,14)
  console.log(questions[generatedNum])//[0])
    channel.send(questions[generatedNum][0])
   setTimeout(() => {
        channel.send(questions[generatedNum][1]);
       
       newArr = questions.splice(generatedNum, 1)
       fs.writeFileSync("questions.json", JSON.stringify(file));
       //TODO: DELETE ITEM FROM ARRAY
   }, 1000)//Wait 12 hours: 1000 * 60 * 60 * 12
  });
});  
module.exports = client;

client.login(process.env.BOT_TOKEN)
