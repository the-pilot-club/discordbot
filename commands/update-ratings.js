const {SlashCommandBuilder} = require('discord.js');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update-ratings')
        .setDescription('Update your VATSIM Ratings with The Pilot Club!'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Update my Ratings!')
                    .setURL(`https://callsigns.thepilotclub.org/sendauthentication.aspx?id=${interaction.user.id}`)
                    .setStyle(ButtonStyle.Link),
            );
        await interaction.reply({content: `Update your ratings here!`,components: [row],ephemeral: true})
    }
};