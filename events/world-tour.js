const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.toLowerCase() === "world tour") {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Get the World Tour Role')
                        .setURL("https://discord.com/channels/830201397974663229/833198809701679124/848245312815497237")
                        .setStyle(ButtonStyle.Link),
                )
            message.reply({
                content: "Want to join the World Tour Flight? Proceed to this message and click the World Tour Logo!",
                components: [row]
            })
        }
    }
};