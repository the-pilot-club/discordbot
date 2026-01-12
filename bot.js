import { Client, GatewayIntentBits, Events } from "discord.js";
import { handleInteractionCreateEvent, handleMessageCreateEvent, sendToSentry } from "./utils.js";
import { imReady } from "./events/ready.js";
import roleNotification from "./events/roles.js";
import { allCommands } from "./commands/index.js";
import { cronJobs } from "./cron-jobs/index.js";
import { Config } from "./config/config.js";
import { guildMemberAdd, guildMemberRemove, guildBanAdd, guildBanRemove, guildMemberUpdate, init } from "./logs.js";
import * as Sentry from "@sentry/node";
import { autoMod } from "./events/automod.js";
import { initRedis, getAllEventReminders } from "./redisStore.js";

const cfg = {
  env: () => (typeof Config?.env === "function" ? Config.env() : Config?.env),
  token: () => (typeof Config?.token === "function" ? Config.token() : Config?.token),
  sentryDsn: () => (typeof Config?.sentryDsn === "function" ? Config.sentryDsn() : Config?.sentryDsn),
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.AutoModerationExecution,
  ],
});

if (cfg.env() === "prod") {
  Sentry.init({
    dsn: cfg.sentryDsn(),
    environment: cfg.env(),
    tracesSampleRate: 1.0,
  });
  console.log("Sentry Logged In!");
}

// this is to verify the env is set correctly on startup
cfg.env();
if (typeof client.setMaxListeners === "function") client.setMaxListeners(0);

client.eventReminders = [];
client.commands = allCommands;

// client.on(Events.MessageCreate, handleMessageCreateEvent)
client.on(Events.InteractionCreate, handleInteractionCreateEvent);
client.on(Events.ClientReady, imReady);
client.on(Events.ClientReady, init);
client.on(Events.GuildMemberUpdate, roleNotification);
client.on(Events.ClientReady, cronJobs);
client.on(Events.GuildBanAdd, guildBanAdd);
client.on(Events.GuildBanRemove, guildBanRemove);
client.on(Events.GuildMemberAdd, guildMemberAdd);
client.on(Events.GuildMemberRemove, guildMemberRemove);
client.on(Events.GuildMemberUpdate, guildMemberUpdate);
client.on(Events.AutoModerationActionExecution, autoMod);

(async () => {
  try {
    await initRedis();

    const reminders = await getAllEventReminders();
    if (Array.isArray(reminders)) {
      client.eventReminders = reminders;
      console.log(`Loaded ${reminders.length} eventReminders from Redis`);
    }
  } catch (err) {
    console.error("Redis Load failed:", err);
  }

  client.login(cfg.token()).catch((err) => sendToSentry(err, "Bot Login"));
})();