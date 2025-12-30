import { createClient } from "redis";

let redisClient = null;
let connecting = null;
const EVENT_REMINDERS_KEY = "tpc:discordbot:eventReminders";

export async function initRedis() {
  const url = process.env.redis;
  if (!url) return null;

  if (redisClient) return redisClient;
  if (connecting) return connecting;

  connecting = (async () => {
    const client = createClient({ url });

    client.on("error", (err) => {
      console.error("Redis error:", err);
    });

    await client.connect();
    redisClient = client;
    connecting = null;

    console.log("Redis connected");
    return redisClient;
  })();

  return connecting;
}

export async function hasEventReminder(eventId) {
  const r = await initRedis();
  if (!r) return null; // config
  const res = await r.sIsMember(EVENT_REMINDERS_KEY, eventId);
  return res === 1;
}

export async function addEventReminder(eventId) {
  const r = await initRedis();
  if (!r) return false;
  await r.sAdd(EVENT_REMINDERS_KEY, eventId);
  return true;
}

export async function getAllEventReminders() {
  const r = await initRedis();
  if (!r) return null;
  return await r.sMembers(EVENT_REMINDERS_KEY);
}