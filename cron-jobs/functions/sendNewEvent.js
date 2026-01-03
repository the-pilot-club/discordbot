import {AttachmentBuilder} from "discord.js";
import {sendToSentry} from "../../utils.js";
import {Config} from "../../config/config.js";
import {hasEventReminder, addEventReminder} from "../../redisStore.js";

const config = Config

export async function sendNewEvent(channel, pings) {
    try {
        const guild = channel.client.guilds.cache.find(guild => {
            return guild.id === config.guild()
        })

        if (guild === undefined) {
            throw new Error(`guild not found in cache for guild id "${config.guild()}"`)
        }

        const events = await guild.scheduledEvents.fetch()

        if (events.size === 0) {
            throw new Error(`failed to fetch scheduled events for guild id "${config.guild()}"`);
        }

        const sortedEvents = events.sort((a, b) => a.scheduledStartAt - b.scheduledStartAt)
        const nextEvent = sortedEvents.first()
        const now = new Date()

        const withinOneHour =
            Math.abs(nextEvent.scheduledStartAt - now) <= 60 * 60 * 1000

        if (!withinOneHour) return;

        let seenInRedis = null;

        try {
            seenInRedis = await hasEventReminder(nextEvent.id)
        } catch (err) {
            console.error("Redis hasEventReminder failed:", err)
            seenInRedis = null
        }

        if (seenInRedis === true) return;
        if (channel.client.eventReminders.includes(nextEvent.id)) return;

        const day = nextEvent.scheduledStartAt.getDay();
        const image = new AttachmentBuilder(
            nextEvent.coverImageURL({
                size: 4096,
                extension: "jpeg"
            }),
            "event-banner.jpeg"
        );

        if (nextEvent.image !== null) {
            channel.send({
                content:
                    pings[day] +
                    "\n**The event is starting in 1 hour. See you there!**\n" +
                    nextEvent.description +
                    `\n\nHosted by ${nextEvent.creator}\n\n${nextEvent.url}`,
                files: [image]
            });
        } else {
            channel.send({
                content:
                    pings[day] +
                    "\n**The event is starting in 1 hour.**\n" +
                    nextEvent.description +
                    `\n\nHosted by ${nextEvent.creator}\n\n${nextEvent.url}`
            });
        }

        try {
            await addEventReminder(nextEvent.id);
        } catch (err) {
            console.error("Redis addEventReminder failed:", err);
        }

        channel.client.eventReminders.push(nextEvent.id);

    } catch (error) {
        console.error(error);
        sendToSentry(error, "event-ping");
    }
}