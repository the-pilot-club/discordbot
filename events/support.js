const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.toLowerCase() === "support") {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('The Pilot Club Support')
                        .setURL("https://support.thepilotclub.org/open.php")
                        .setStyle('LINK'),
                )
            message.reply({
                content: "To get support or submit feedback, click the button below! Thank you for being a valued member of The Pilot Club!!",
                components: [row]
            })
        }
    }
};