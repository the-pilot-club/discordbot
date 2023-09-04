import { EmbedBuilder } from 'discord.js'
export default {
  name: 'interactionCreate',
  once: false,
  async execute (interaction) {
    if (interaction.customId === 'charter-ferry') {
      const channel = interaction.guild.client.channels.cache.find(channel => channel.name === 'charters-requests')
      const tail = interaction.fields.getTextInputValue('aircraft-registration')
      const start = interaction.fields.getTextInputValue('starting-icao')
      const end = interaction.fields.getTextInputValue('ending-icao')
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${interaction.member.displayName}`,
          iconURL: `${interaction.user.displayAvatarURL()}`
        })
        .setTitle('New Ferry Request')
        .setColor('0X37B6FF')
        .addFields({
          name: '\u200b',
          value: `**TPC Charters User:** ${interaction.user} \n**Registration Number:** ${tail.toUpperCase()} \n**Starting Location:** ${start.toUpperCase()} \n**Ending Location** ${end.toUpperCase()}`
        })
        .setFooter({ text: 'Made by TPC Dev Team' })
      if (interaction.member.roles.cache.some(role => role.name === 'Charters Pilots')) {
        channel.send({ content: '<@&910012872246046730>', embeds: [embed] })
        await interaction.reply({
          content: `You have requested for tail number ${tail.toUpperCase()} to be ferried from ${start.toUpperCase()} to ${end.toUpperCase()}. A Charters Manager will ferry the aircraft as soon as they can. If you do not have the aircraft moved within 12 hours, please try this command again.`,
          ephemeral: true
        })
      }
    }
  }
}
