import {config} from "dotenv";

config()
import {Client, GatewayIntentBits, AttachmentBuilder, Events} from 'discord.js'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildScheduledEvents]
})
import cron from 'node-cron'
import {handleInteractionCreateEvent, handleMessageCreateEvent, sendToSentry} from "./utils.js";
import {imReady} from "./events/ready.js";
import roleNotification from "./events/roles.js";
import {allCommands} from "./commands/index.js";
import {cronJobs} from "./cron-jobs/index.js";

client.setMaxListeners(0)

client.eventReminders = [];
client.commands = allCommands
client.on(Events.MessageCreate, handleMessageCreateEvent)
client.on(Events.InteractionCreate, handleInteractionCreateEvent)
client.on(Events.ClientReady, imReady)
client.on(Events.GuildMemberUpdate, roleNotification)
client.on(Events.ClientReady, cronJobs)
client.login(process.env.BOT_TOKEN).catch(err => (console.log(err)))