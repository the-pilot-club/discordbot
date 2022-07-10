const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Replies with the Member Count!'),
    async execute(interaction) {
        await interaction.reply(`Total members: ${interaction.guild.memberCount}`);
    },
};