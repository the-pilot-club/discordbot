import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Picks a random user with giveaway role.'),
  async execute (interaction) {
    if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')) {
      interaction.guild.members.fetch().then(members => {
        const result = members.filter(m => m.roles.cache.find(role => role.name === 'Giveaway'))
        const tags = result.map(m => m.user.toString())
        const winner = tags[Math.floor(Math.random() * tags.length)]
        if (winner !== undefined) {
          const winnerEmbed = new EmbedBuilder()
            .setDescription(`And the winner is ${winner} Congratulations!`)
            .setAuthor({
              name: 'The Pilot Club',
              iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
            })
            .setColor('#37B6FF')
            .setFooter({ text: 'Made by TPC Dev Team' })
            .setTimestamp()

          interaction.deferReply()
          setTimeout(function () {
            interaction.editReply({ content: `Congrats ${winner}!`, embeds: [winnerEmbed] })
          }, 3000)
        } else { interaction.reply('No one has this role.') }
      })
    } else {
      interaction.reply('Sorry, /giveaway is staff only')
    }
  }
}
