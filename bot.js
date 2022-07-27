require('dotenv').config()

const {Client, Collection, Intents, Interaction} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS]});
const fs = require('fs');
const {clientId, guildId, token} = require('./config.json');
const path = require('node:path');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
client.setMaxListeners(0);
let monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "june",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
];

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command! Please let Eric | ZSE | TPC76 know ASAP so that a fix can occur!',
            ephemeral: true
        });
    }
});

//commuter role
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (oldMember.roles.cache.has(process.env.COMMUTER_ROLE)) return;
    if (newMember.roles.cache.has(process.env.COMMUTER_ROLE)) {
        const channel = client.channels.cache.get(process.env.EVENT_CHANNEL);
        channel.send({
            content: `Join us in congratulating ${oldMember} with achieving <@&930863426224410684> status at TPC!`,
            files: [{
                attachment: `./pics/congrats.png`,
                name: 'file.png'
            }]
        })
    }
})

//frequent flyer
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (oldMember.roles.cache.has(process.env.FREQUENTFLIER_ROLE)) return;
    if (newMember.roles.cache.has(process.env.FREQUENTFLIER_ROLE)) {
        const channel = client.channels.cache.get(process.env.EVENT_CHANNEL);
        channel.send({
            content: `Join us in congratulating ${oldMember} with achieving <@&855253377209204750> status at TPC!`,
            files: [{
                attachment: `./pics/congrats.png`,
                name: 'file.png'
            }]
        })
    }
})

//VIP
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (oldMember.roles.cache.has(process.env.VIP_ROLE)) return;
    if (newMember.roles.cache.has(process.env.VIP_ROLE)) {
        const channel = client.channels.cache.get(process.env.EVENT_CHANNEL);
        channel.send({
            content: `Join us in congratulating ${oldMember} with achieving <@&930863007372836876> status at TPC!`,
            files: [{
                attachment: `./pics/congrats.png`,
                name: 'file.png'
            }]
        })
    }
})
//Booster
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (oldMember.roles.cache.has(process.env.BOOSTER_ROLE)) return;
    if (newMember.roles.cache.has(process.env.BOOSTER_ROLE)) {
        const channel = client.channels.cache.get(process.env.EVENT_CHANNEL);
        channel.send(`${oldMember} Thank you for boosting the club!`);
    }
})
//dm for charters role
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (oldMember.roles.cache.has(process.env.CHARTERS_ROLE)) return;
    if (newMember.roles.cache.has(process.env.CHARTERS_ROLE)) {
        newMember.user.send("Welcome to TPC Charters, we look forward to having you fly with us. Please read https://www.thepilotclub.org/s/TPC_Charters_-_pilots_guide_v10.pdf.  We hope this will answer most of your questions.  If you still have questions after having read this, then ask away."
        ).catch(error => {
            console.error`I could not DM this member :(`
        })
    }
})


// Cron Jobs for the quiz and the event postings

const file = require("./questions.json")
const cron = require('node-cron'); //ability to repeat code
const {EventEmitter} = require('stream');

function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function sendNewQuestion(channel, testChannel) {
    let generatedNum = randomNum(0, questions.length)
    var correct = questions[generatedNum][1]
    if (correct.includes('🇦')) {
        correct = '🇦'
    } else if (correct.includes('🇧')) {
        correct = '🇧'
    } else if (correct.includes('🇨')) {
        correct = '🇨'
    }
    channel.send(questions[generatedNum][0]).then(message => {
        message.react('🇦');
        message.react('🇧');
        message.react('🇨');
        const filter = (reaction, user) => {
            return user.id != message.author.id && reaction.emoji.name === '🇦' || user.id != message.author.id && reaction.emoji.name === '🇧' || user.id != message.author.id && reaction.emoji.name === '🇨'
        };
        const collector = message.createReactionCollector({filter, time: 43200000}); //correct time: 43200000
        var users = []
        collector.on('collect', (reaction, user) => {
            //console.log(`Collected ${reaction.emoji.name} from ${user.id}`);
            if (reaction.emoji.name == correct && !users.includes(user.id)) {
                users.push([user.id, reaction.emoji.name])
            }
        });

        collector.on('end', collected => {

            //console.log(`Correct: ${correct} Users: ${users}`);
            var formatted = ""
            for (var i = 0; i < users.length; i++) {
                formatted += "\n" + ("<@" + users[i][0] + ">")
            }
            console.log(formatted)
            testChannel.send(`Congrats to the following people for successfully answering today's quiz! The correct answer was ${correct} ${formatted}`)
        });
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
        files: [{
            attachment: `./pics/${flight}.png`,
            name: 'file.png'
        }]
    })

}

function sendNewAnswer(channel) {
    channel.send(questions[file.latestQuestion][1]);
}

//Parsing questions
let questions = file.questions;
let index = randomNum(0, questions.length - 1);
let question = questions[index];

client.on('ready', async function () {
    const channel = await client.channels.fetch(process.env.QANDA_CHANNEL_ID);
    const eventChannel = await client.channels.fetch(process.env.EVENT_CHANNEL);
    const tpcguildId = process.env.TPC_GUILD_ID;
    const testChannel = await client.channels.fetch(process.env.TEST_CHANNEL); //correct id: 864834861603487754
//Getting random question every day:  0 57 22 * * *
    cron.schedule('0 00 08 * * *', function () { //Correct time is 0 00 08 * * *
        sendNewQuestion(channel , testChannel);
    });
    cron.schedule('0 52 07 * * *', function () { // Correct time is 0 52 07 * * *
        sendNewAnswer(channel);
    });

//EVENTS:

    //GA Tuesday
    cron.schedule('0 18 * * 2', function () {
        sendNewEvent(eventChannel, "ga-tuesday", "<@&937389346204557342> <@&898240224189120532>");
    });
    // Fly In Thursday
    cron.schedule('0 18 * * 4', function () {
        sendNewEvent(eventChannel, "sbr-tpc-fly-in-thursday", "<@&937389346204557342>");
    });
    //Sunday Funday
    cron.schedule('0 13 * * 0', function () {
        sendNewEvent(eventChannel, "sunday-funday", "<@&937389346204557342>");
    });
    //World Tour
    cron.schedule('0 10 * * 6', function () { // every saturday
        const today = new Date();
        const day = today.getDate();        // 24
        if (day <= 7) {
            const month = monthNames[today.getMonth()] //may
            const year = today.getFullYear();   // 2020
            eventChannel.send({
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
// Challenge Flight
    cron.schedule('0 14 * * 6', function () { // every saturday
        const today = new Date();
        const day = today.getDate();        // 24
        if (day > 7 && day <= 14) {
            //second saturday of the month
            sendNewEvent(eventChannel, "challengeflight", "<@&937389346204557342>");
        } else {
            console.log("not second saturday of the month")
        }
    });
// 15-Zulu Flight
    cron.schedule('0 11 * * 6', function () { // every saturday
        const today = new Date();
        const day = today.getDate();// 24
        if (day > 14 && day <= 21) {
            //third saturday of the month
            sendNewEvent(eventChannel, "15zulu", "<@&937389346204557342>");
        } else {
            console.log("not third saturday of the month")
        }
    });
});

module.exports = client;
client.login(process.env.BOT_TOKEN)