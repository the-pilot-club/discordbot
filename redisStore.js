import { createClient } from "redis";

let redisClient = null;
let connecting = null;

const EVENT_REMINDERS_KEY = "tpc:discordbot:eventReminders";

export async function initRedis() {
  const url = process.env.REDIS_URL;
  if (!url) return null;

  if (redisClient) return redisClient;
  if (connecting) return connecting;

  connecting = (async () => {
    try {
      const client = createClient({ url });

      client.on("error", (err) => {
        console.error("Redis error:", err);
      });

      await client.connect();
      redisClient = client;

      console.log("Redis connected");
      return redisClient;
    } catch (err) {
      console.error("Redis connect failed:", err);
      redisClient = null;
      return null;
    } finally {
      connecting = null;
    }
  })();

  return connecting;
}

export async function hasEventReminder(eventId) {
  const r = await initRedis();
  if (!r) return null; // redis not configured

  try {
    const res = await r.sIsMember(EVENT_REMINDERS_KEY, eventId);
    return res;
  } catch (err) {
    console.error("Redis sIsMember failed:", err);
    return null;
  }
}

export async function addEventReminder(eventId) {
  const r = await initRedis();
  if (!r) return false;

  try {
    await r.sAdd(EVENT_REMINDERS_KEY, eventId);
    return true;
  } catch (err) {
    console.error("Redis sAdd failed:", err);
    return false;
  }
}

export async function getAllEventReminders() {
  const r = await initRedis();
  if (!r) return null;

  try {
    return await r.sMembers(EVENT_REMINDERS_KEY);
  } catch (err) {
    console.error("Redis sMembers failed:", err);
    return null;
  }
}