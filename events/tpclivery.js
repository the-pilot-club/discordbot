const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.toLowerCase() === "tpc livery") {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('TPC Liveries')
                        .setURL("https://thepilotclub.org/sop#liveries")
                        .setStyle('LINK'),
                )
            message.reply({content: `Club liveries can be downloaded here:`, components: [row]})
        }
    }
};