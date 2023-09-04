import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
export default {
  name: 'messageCreate',
  once: false,
  execute (message) {
    if (message.content.toLowerCase() === 'tpc livery') {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('TPC Liveries')
            .setURL('https://thepilotclub.org/sop#liveries')
            .setStyle(ButtonStyle.Link)
        )
      message.reply({ content: 'Club liveries can be downloaded here:', components: [row] })
    }
  }
}
