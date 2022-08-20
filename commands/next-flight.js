const {SlashCommandBuilder} = require('discord.js');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('next-flight')
        .setDescription('The link to find out our next flight!'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Next TPC Group Flight')
                    .setURL("https://thepilotclub.org/dispatch")
                    .setStyle(ButtonStyle.Link),
            );
        await interaction.reply({content: `Next TPC Group Flight:`, components: [row]})
    }
};