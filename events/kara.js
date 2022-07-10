module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.includes("Kara"))
            message.reply("Thats my name, dont wear it out!")
    }
};