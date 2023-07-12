require('dotenv').config()
const {Client, Collection, GatewayIntentBits} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildScheduledEvents]
})
const fs = require('node:fs');
const path = require('node:path');
client.setMaxListeners(0);
let monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
];
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command! Please let Eric | ZSE | TPC76 know ASAP so that a fix can occur!'
                + '\n \nIf this is the booking or PIREP Command, please un-archive the channel as this is the reason you are getting this error',
            ephemeral: true
        }).catch(err => (console.log(err)));
    }
})

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//Role congrats and Charters DM
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const channel = client.channels.cache.find(channel => channel.name === "crew-chat");
    if (oldMember.roles.cache.has(process.env.COMMUTER_ROLE)) return;
    if (newMember.roles.cache.has(process.env.COMMUTER_ROLE)) {
        channel.send({
            content: `Join us in congratulating ${oldMember} with achieving <@&930863426224410684> status at TPC! You are now part of the TPC **COMPANY PERKS** Program!`,
            files: [{attachment: `./pics/congrats.png`, name: 'file.png'}]
        })
    }
})
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const channel = client.channels.cache.find(channel => channel.name === "crew-chat");
    if (oldMember.roles.cache.has(process.env.FREQUENTFLIER_ROLE)) return;
    if (newMember.roles.cache.has(process.env.FREQUENTFLIER_ROLE)) {
        channel.send({
            content: `Join us in congratulating ${oldMember} with achieving <@&855253377209204750> status at TPC! You are now part of the TPC **COMPANY PERKS** Program!`,
            files: [{attachment: `./pics/congrats.png`, name: 'file.png'}]
        })
    }
})
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const channel = client.channels.cache.find(channel => channel.name === "crew-chat");
    if (oldMember.roles.cache.has(process.env.VIP_ROLE)) return;
    if (newMember.roles.cache.has(process.env.VIP_ROLE)) {
        channel.send({
            content: `Join us in congratulating ${oldMember} with achieving <@&930863007372836876> status at TPC! You are now part of the TPC **COMPANY PERKS** Program!`,
            files: [{attachment: `./pics/congrats.png`, name: 'file.png'}]
        })
    }
    if (oldMember.roles.cache.has(process.env.BOOSTER_ROLE)) return;
    if (newMember.roles.cache.has(process.env.BOOSTER_ROLE)) {
        channel.send(`${oldMember} Thank you for boosting the club!`);
    }
})

// Cron Jobs for the quiz and the event postings

const file = require("./questions.json")
const cron = require('node-cron');

function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

function sendNewQuestion(channel) {
    let generatedNum = randomNum(0, questions.length)
    channel.send(questions[generatedNum][0]).then(message => {
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
        content: ping + ` One hour until the flight briefing. Head to the airport soon to start setting up! See you there! https://www.thepilotclub.org/dispatch/${flight}-${day}${month}${year}`,
        files: [{attachment: `./pics/${flight}.png`, name: 'file.png'}]
    })
}

function sendNewAnswer(channel) {
    channel.send(questions[file.latestQuestion][1]);
}

//Parsing questions
let questions = file.questions;

client.on('ready', async function () {
    const channel = await client.channels.cache.find(channel => channel.name === "aviation-quiz");
    const eventChannel = await client.channels.cache.find(channel => channel.name === "crew-chat");
//Getting random question every day:  0 57 22 * * *
    cron.schedule('0 00 08 * * *', function () { //Correct time is 0 00 08 * * *
        sendNewQuestion(channel);
    });
    cron.schedule('0 52 07 * * *', function () { // Correct time is 0 52 07 * * *
        sendNewAnswer(channel);
    });

//EVENTS:
    //GA Tuesday
    cron.schedule('0 18 * * 2', function () {
        sendNewEvent(eventChannel, "ga-tuesday", "<@&937389346204557342> <@&898240224189120532>");
    });
    // Bush Wednesday
    cron.schedule('0 18 22-28 * 3', function () {
    sendNewEvent(eventChannel, "bush-wednesday", "<@&937389346204557342> <@&898240224189120532>");
    });

    //Challenge Flight
    cron.schedule('0 18 8-14 * 6', function () {
        sendNewEvent(eventChannel,'challenge-flight','<@&937389346204557342>');
      });
      
    // // Fly In Thursday
    cron.schedule('0 18 * * 4', function () {
        sendNewEvent(eventChannel, "sbr-tpc-fly-in-thursday", "<@&937389346204557342>");
    });
    // //Sunday Funday
    cron.schedule('0 13 * * 0', function () {
        sendNewEvent(eventChannel, "sunday-funday", "<@&937389346204557342>");
    });
});

module.exports = client;
client.login(process.env.BOT_TOKEN).catch(err => (console.log(err)))
