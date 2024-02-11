const { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('idea-archive')
    .setDescription('This command is for the Admin team to process archives for ideas that have been put in the idea box.'
    ).addStringOption(option =>
      option.setName('suggestion-number').setDescription('What is the Idea Number?').setRequired(true)
    ).addStringOption(option =>
      option.setName('member-who-suggested').setDescription('Copy and paste the username who suggested the idea.').setRequired(true)
    ).addStringOption(option =>
      option.setName('idea-details').setDescription('Copy and paste the idea details').setRequired(true)
    ).addStringOption(option =>
      option.setName('reason-given').setDescription('Copy and paste the reason given details').setRequired(false)
    ),
  async execute (interaction) {
    const channel = interaction.guild.client.channels.cache.find(channel => channel.name === 'ideabox-archive')
    const number = interaction.options.getString('suggestion-number')
    const idea = interaction.options.getString('idea-details')
    const reason = interaction.options.getString('reason-given')
    const user = interaction.options.getString('member-who-suggested')
    const noreasonembed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
      .setTitle(`Implemented Idea Archive for Suggestion #${number}`)
      .setColor('#37B6FF')
      .addFields({
        name: 'Suggestion Details:',
        value: `**Username of Idea Author:** ${user} \n **Users Idea:** ${idea}`
      })
      .setFooter({ text: 'Made by TPC Dev Team' })
    if (interaction.member.roles.cache.some(role => role.name === 'Air Marshals')) {
      if (reason !== null) {
        noreasonembed.addFields({ name: 'Reason Given', value: `${reason}` })
        channel.send({ embeds: [noreasonembed] })
      } else {
        channel.send({ embeds: [noreasonembed] })
      }
      await interaction.reply({ content: 'The idea has been posted in the archive channel', ephemeral: true })
    } else {
      interaction.reply({
        content: 'This command is only for the Admin of The Pilot Club. Please try another command.',
        ephemeral: true
      })
    }
  }

}
