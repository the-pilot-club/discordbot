const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.toLowerCase() === "join vatsim") {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Joining VATSIM')
                        .setURL("https://my.vatsim.net/")
                        .setStyle('LINK'),
                )
            message.reply({
                content: "To Join VATSIM you should go to this website and click register!",
                components: [row]
            })
        }
    }
};