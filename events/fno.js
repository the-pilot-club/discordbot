const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.toLowerCase() === "what is fno?") {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Friday Night Operations Information')
                        .setURL("https://docs.google.com/document/d/1n2dorXXbRavCci0FqYMMDQngrYqnn3UXNDAiK95Kc98/")
                        .setStyle('LINK'),
                )
            message.reply({
                content: "FNO Stands for Friday Night Ops. You can find more information here!",
                components: [row]
            })
        }
    }
};