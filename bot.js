import dotenv from 'dotenv'
import Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'
import { ActivityType, Client, Events, GatewayIntentBits } from 'discord.js'
import eventsCrons from './eventsCrons.js'
import dev_constants from './env-constants/dev_constants.js'
import prod_constants from './env-constants/prod_constants.js'
import { handleInteractionCreateEvent, handleMessageCreateEvent, sendErrorToSentry } from './utils.js'
import {
  scheduleGroupFlightEventCrons,
  scheduleQuizEventCrons
} from './cronUtils.js'
import allCommands from './commands/index.js'

dotenv.config()

export let guildConstants

guildConstants = dev_constants

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  guildConstants = prod_constants

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new ProfilingIntegration()
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0 // Capture 100% of the transactions, reduce in production!
  })
}

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildScheduledEvents
  ]
})

client.setMaxListeners(1)

client.commands = allCommands

client.on(Events.MessageCreate, handleMessageCreateEvent)
client.on(Events.InteractionCreate, handleInteractionCreateEvent)

client.on(Events.ClientReady, function () {
  client.channels.fetch(guildConstants.AVIATION_CHANNEL_ID).then(
    /** @param {import('discord.js').TextChannel} channel */
    function (channel) {
      if (channel !== null) {
        scheduleQuizEventCrons(eventsCrons, channel)
      } else {
        throw Error(`channel with id ${guildConstants.AVIATION_CHANNEL_ID} not found`)
      }
    }
  ).catch(error => sendErrorToSentry(error, 'scheduleQuizCrons'))

  client.channels.fetch(guildConstants.CREW_CHAT_CHANNEL_ID).then(
    /** @param {import('discord.js').TextChannel} channel */
    function (channel) {
      if (channel !== null) {
        scheduleGroupFlightEventCrons(eventsCrons, channel)
      } else {
        throw Error(`channel with id ${guildConstants.CREW_CHAT_CHANNEL_ID} not found`)
      }
    }).catch(error => sendErrorToSentry(error, 'scheduleGroupFlightCrons'))

  client.channels.fetch(guildConstants.GITHUB_NOTIFICATION_CHANNEL_ID).then(
  /** @param {import('discord.js').TextChannel} channel */
    function (channel) {
      if (channel != null) {
        console.log(`Logged in as ${client.user.tag}`)
        channel.send('https://tenor.com/view/hiding-under-covers-tired-sleepy-hiding-under-blanket-good-night-gif-19864771')
        client.user.setActivity('XPlane 11', { type: ActivityType.Playing })
      } else {
        throw Error(`channel with id ${guildConstants.GITHUB_NOTIFICATION_CHANNEL_ID} not found`)
      }
    }).catch(error => sendErrorToSentry(error, 'readyEventListenerBotStartup'))
})
client.login(process.env.BOT_TOKEN).catch(error => sendErrorToSentry(error, 'loginBotStartup'))
