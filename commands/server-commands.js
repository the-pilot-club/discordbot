const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-commands')
        .setDescription('The link to get a list of server commands!'),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('TPC Server Commands')
                    .setURL("https://vats.im/tpc-commands")
                    .setStyle('LINK'),
            );
        await interaction.reply({content: `Here is a full list of member friendly commands:`, components: [row]})
    },
};