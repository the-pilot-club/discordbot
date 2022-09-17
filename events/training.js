module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.includes("start") && message.content.includes("training"))
            message.reply("Looking to begin your training with TPC? Check out the video below to find out your first steps! If you have any questions, ask them in <#905287332314374264>.\n\n https://www.youtube.com/watch?v=772dcqXmj48")
    }
};