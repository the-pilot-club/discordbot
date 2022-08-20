const {SlashCommandBuilder} = require('discord.js');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-commands')
        .setDescription('The link to get a list of server commands!'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('TPC Server Commands')
                    .setURL("https://vats.im/tpc-commands")
                    .setStyle(ButtonStyle.Link),
            );
        await interaction.reply({content: `Here is a full list of member friendly commands:`, components: [row]})
    },
};