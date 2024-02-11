const { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('get-online-members')
    .setDescription('Gets the members who are online'),
  async execute (interaction) {
    const remarksUsers = []
    const callsignUsers = []
    const livemembersResponse = await fetch('https://data.vatsim.net/v3/vatsim-data.json')
    const liveMembers = await livemembersResponse.json()
    const tpcPilots = liveMembers.pilots

    const remarksFiltered = tpcPilots.filter(
      (pilot) => pilot.flight_plan?.remarks?.toUpperCase().includes('OPERATED BY THEPILOTCLUB.ORG')
    )

    const callsignFiltered = tpcPilots.filter(
      (pilot) =>
        pilot.callsign.toUpperCase().includes('TPC') &&
        !pilot.flight_plan?.remarks?.toUpperCase().includes('OPERATED BY THEPILOTCLUB.ORG')
    )

    if (remarksFiltered.length === 0) {
      remarksUsers.push('No one has their remarks set correctly.')
    } else {
      for (let i = 0; i < remarksFiltered.length; i++) {
        const remarkObj = remarksFiltered[i]
        remarksUsers.push(`${remarkObj.callsign} - ${remarkObj.name} - ${remarkObj.cid}\n`)
      }
    }

    if (callsignFiltered.length === 0) {
      callsignUsers.push('Nobody is flying with a TPC callsign and incorrect remarks.')
    } else {
      for (let i = 0; i < callsignFiltered.length; i++) {
        const callsignObj = callsignFiltered[i]
        callsignUsers.push(`${callsignObj.callsign} - ${callsignObj.name} - ${callsignObj.cid}\n`)
      }
    }

    const embed = new EmbedBuilder()
      .setTitle('Current Online TPC Members')
      .setDescription(`Correct Remarks:\n${remarksUsers.join('')}\nNo Remarks:\n${callsignUsers.join('')}`)
      .setColor('#37B6FF')
      .setFooter({
        text: 'Made by TPC Dev Team',
        iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
      })
      .setTimestamp()

    await interaction.reply({ embeds: [embed] }).catch((error) => console.error(error))
  }
}
