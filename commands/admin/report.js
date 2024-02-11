const { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Use this command to report a user.')
    .addStringOption(option =>
      option.setName('user').setDescription('who is the user that you would like to report').setRequired(true)
    ).addStringOption(option =>
      option.setName('reason').setDescription('What happened with this user').setRequired(true)
    ).addStringOption(option =>
      option.setName('screenshot').setDescription('a link to screenshot proof (if applicable)').setRequired(false)
    ),
  async execute (interaction) {
    const channel = interaction.guild.client.channels.cache.find(channel => channel.name === 'mod-logs')
    const user = interaction.options.getString('user')
    const reason = interaction.options.getString('reason')
    const ss = interaction.options.getString('screenshot')
    const embed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` })
      .setTitle('New Report')
      .setDescription('A member of TPC has submitted a report for moderation review.')
      .setColor('#FF0000')
      .addFields({
        name: 'Detailed Report',
        value: `**User Reporting:** ${interaction.user} (ID: ${interaction.user.id}) \n  **User Reported:** ${user} \n **Reason:** ${reason} \n **Channel:** ${interaction.channel} \n **Last Messages Sent:** [Jump To Content](https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id})`
      })
      .setFooter({ text: 'Made by TPC Dev Team', iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png' })
    if (ss !== null) {
      embed.setImage(`${ss}`)
    }
    channel.send({ embeds: [embed] })
    await interaction.reply({
      content: `You have reported ${user} for ${reason}. A moderator will deal with this as soon as we can. If this is urgent, please ping Ground Crew as soon as possible.`,
      ephemeral: true
    }
    )
  }
}
