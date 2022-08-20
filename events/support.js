const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.toLowerCase() === "support") {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('The Pilot Club Support')
                        .setURL("https://support.thepilotclub.org/open.php")
                        .setStyle(ButtonStyle.Link),
                )
            message.reply({
                content: "To get support or submit feedback, click the button below! Thank you for being a valued member of The Pilot Club!!",
                components: [row]
            })
        }
    }
};