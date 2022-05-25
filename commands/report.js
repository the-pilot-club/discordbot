const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Use this commnad to report a user.')
            .addStringOption(option =>
            option.setName('user').setDescription('who is the user that you would like to report').setRequired(true))
                .addStringOption(option=>
                option.setName('reason').setDescription('What happened with this user').setRequired(true)),
	async execute(interaction) {
		const channel=channels.cache.get('865416768641433630')
    const user = interaction.options.getString('user')
    const reason = interaction.options.getString('reason')
    let reportembed =
    {
      "type": "rich",
      "author": {
        "name": `${interaction.user.tag}`,
        "icon_url" : `${interaction.user.displayAvatarURL()}`
      },
      "title": `New Report`,
      "description": `A member of TPC has submitted a report for moderation review.`,
      "color": 0XFF0000,
      "fields": [
        {
          "name": `Detailed Report`,
          "value": `**User Reporting:** ${interaction.user} (ID: ${interaction.user.id}) \n  **User Reported:** ${user} \n **Reason:** ${reason} \n **Channel:** ${interaction.channel} \n **Last Messages Sent:** [Jump To Content](https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id})  `
        },
      ],
      "footer": {
        "text": `Made by The Pilot Club For Moderators`
      }
    }
    channel.send({
      embeds: [reportembed]})
    await interaction.reply({content:`You have reported ${user} for ${reason}. A moderator will deal with this as soon as we can. If this is urgent, please ping Ground Crew as soon as possible.`, ephemeral: true}
    )
	},
};