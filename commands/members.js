const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data:  new SlashCommandBuilder()
        .setName('members')
        .setDescription('shows members'),
	async execute(interaction) {
    if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')){
    var members = interaction.guild.roles.cache.get('860938566426558505').members.map(m=>m.user.tag)
    interaction.reply("Members:\n " + members.join("\n"));
    }
	},
};