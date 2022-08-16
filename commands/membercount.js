const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Replies with the Member Count!'),
    async execute(interaction) {
        await interaction.reply(`Number of Captains in The Pilot Club: ${interaction.guild.memberCount}`);
    },
};