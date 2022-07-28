module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.channel.type === 'GUILD_NEWS') {
            message.crosspost()
        }
    }
}