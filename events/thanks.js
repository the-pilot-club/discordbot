const { EmbedBuilder } = require('discord.js')
module.exports = {
  name: 'messageCreate',
  once: false,
  execute (message) {
    if (message.content.toLowerCase().includes('thanks tpc')) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: 'The Pilot Club',
          iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
        })
        .setColor('#37B6FF')
        .setDescription('You\'re welcome! Anytime!')
      message.reply({ embeds: [embed] })
    }
  }
}
