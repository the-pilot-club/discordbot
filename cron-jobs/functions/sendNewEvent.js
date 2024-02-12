import {AttachmentBuilder} from "discord.js";
import {sendToSentry} from "../../utils.js";

export async function sendNewEvent(channel, pings) {
    try {
        const guild = channel.client.guilds.cache.find(guild => {
            return guild.id === process.env.GUILD_ID
        })

        if (guild === undefined) {
            throw new Error(`guild not found in cache for guild id "${process.env.GUILD_ID}"`)
        }

        const events = await guild.scheduledEvents.fetch()

        if (events.size === 0) {
            throw new Error(`failed to fetch scheduled events for guild id "${process.env.GUILD_ID}"`)
        }

        const sortedEvents = events.sort((a, b) => a.scheduledStartAt - b.scheduledStartAt)
        const nextEvent = sortedEvents.first()
        const now = new Date()
        if (Math.abs(nextEvent.scheduledStartAt - now) <= 60 * 60 * 1000 && !channel.client.eventReminders.includes(nextEvent.id)) {
            const day = nextEvent.scheduledStartAt.getDay()
            const image = new AttachmentBuilder(nextEvent.coverImageURL({
                size: 4096,
                extension: "jpeg"
            }), 'event-banner.jpeg')
            if (nextEvent.image !== null) {
                channel.send({
                    content: pings[day] + "\n **The event is starting in 1 hour. See you there!**\n" + nextEvent.description + `\\n\\n Hosted by ${nextEvent.creator} \\n`,
                    files: [image]
                })
            } else {
                channel.send({
                    content: pings[day] + "\n" + "**The event is starting in 1 hour.**\n" + nextEvent.description + `\\n\\n Hosted by ${nextEvent.creator} \\n`,
                })
            }

            channel.client.eventReminders.push(nextEvent.id)
        }
    } catch (error) {
        console.log(error)
        sendToSentry(error, 'event-ping')
    }
}