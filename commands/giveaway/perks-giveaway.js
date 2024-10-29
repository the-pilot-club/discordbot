import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('perks-giveaway')
    .setDescription('Picks random user with company perks role(s)'),
  async execute (interaction) {
    if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')) {
      await interaction.deferReply()
      const entries = []
      interaction.guild.members.fetch().then(members => {
        members.forEach(member => {
          if(member.roles.cache.find(role => role.name === 'VIP')){
            entries.push(member.user.toString())
            entries.push(member.user.toString())
            entries.push(member.user.toString())
          } else if(member.roles.cache.find(role => role.name === 'Frequent Flyer')){
            entries.push(member.user.toString())
            entries.push(member.user.toString())
          } else if(member.roles.cache.find(role => role.name === 'Commuter') || member.roles.cache.find(role => role.name === 'Early Adopters')|| member.roles.cache.find(role => role.name === 'Charters Top Gun')){
            entries.push(member.user.toString())
          }
        })
        if(entries.length === 0){
          interaction.editReply({content: 'No one has any of these roles for some reason'})
          return
        }
        const winner = entries[Math.floor(Math.random() * entries.length)]
        const winnere = new EmbedBuilder()
          .setDescription(`And the winner is ${winner} Congratulations!`)
          .setAuthor({
            name: 'The Pilot Club',
            iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
          })
          .setColor('#37B6FF')
          .setFooter({ text: 'Made by TPC Dev Team' })
          .setTimestamp()


        setTimeout(function () {
          interaction.editReply({ content: `Congrats ${winner}!`, embeds: [winnere] })
        }, 3000)
      })
    }
  }
}
