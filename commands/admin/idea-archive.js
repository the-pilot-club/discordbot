import { EmbedBuilder } from 'discord.js'
import { guildConstants } from '../../bot.js'

/** @param {import('discord.js').ChatInputCommandInteraction} interaction */
export default function ideaArchive (interaction) {
  interaction.guild.client.channels.fetch(guildConstants.IDEA_ARCHIVE_CHANNEL_ID).then(channel => {
    if (channel !== null) {
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
          noreasonembed.addFields({
            name: 'Reason Given',
            value: `${reason}`
          })
        }
        channel.send({ embeds: [noreasonembed] })
        interaction.reply({ content: 'The idea has been posted in the archive channel', ephemeral: true })
      } else {
        interaction.reply({
          content: 'This command is only for the Admin of The Pilot Club. Please try another command.',
          ephemeral: true
        })
      }
    }
  })
}
