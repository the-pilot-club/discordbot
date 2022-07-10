module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.includes("Kara"))
            message.reply("That's my name, dont wear it out!")
    }
};