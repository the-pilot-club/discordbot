import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('perks-giveaway')
    .setDescription('Picks random user with company perks role(s)'),
  async execute (interaction) {
    if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')) {
      interaction.deferReply()
      interaction.guild.members.fetch().then(members => {
        const entries = []
        const vip = members.filter(m => m.roles.cache.find(role => role.name === 'VIP')).map(m => m.user.toString())
        for (const vipEntry of vip){
          entries.push(vipEntry)
          entries.push(vipEntry)
          entries.push(vipEntry)
        }
        const frequentFliers = members.filter(m => m.roles.cache.find(role => role.name === 'Frequent Flyer')).map(m => m.user.toString())
        for (const ffEntry of frequentFliers){
          entries.push(ffEntry)
          entries.push(ffEntry)
        }
        const commuters = members.filter(m => m.roles.cache.find(role => role.name === 'Commuter')).map(m => m.user.toString())
        for (const entry of commuters){
          entries.push(entry)
        }
        const ea = members.filter(m => m.roles.cache.find(role => role.name === 'Early Adopters')).map(m => m.user.toString())
        for (const entry of ea){
          entries.push(entry)
        }
        const topGun = members.filter(m => m.roles.cache.find(role => role.name === 'Charters Top Gun')).map(m => m.user.toString())
        for (const entry of topGun){
          entries.push(entry)
        }
        const winner = entries[Math.floor(Math.random() * entries.length)]
        if (winner !== undefined) {
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
        } else { interaction.reply('No one has any of these roles for some reason') }
      })
    }
  }
}
