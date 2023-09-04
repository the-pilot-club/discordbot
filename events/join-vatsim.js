import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

export default {
  name: 'messageCreate',
  once: false,
  execute (message) {
    if (message.content.includes('join vatsim')) {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Joining VATSIM')
            .setURL('https://my.vatsim.net/')
            .setStyle(ButtonStyle.Link)
        )
      message.reply({
        content: 'To Join VATSIM you should go to this website and click register!',
        components: [row]
      })
    }
  }
}
