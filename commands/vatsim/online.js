import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { sendToSentry } from "../../utils.js";

export default {
  data: new SlashCommandBuilder()
      .setName('get-online-members')
      .setDescription('Gets the members who are online'),
  async execute(interaction) {
    const livemembersResponse = await fetch('https://data.vatsim.net/v3/vatsim-data.json');
    const liveMembers = await livemembersResponse.json();
    const tpcPilots = liveMembers.pilots;

    const remarksUsers = [];
    const callsignUsers = [];
    const noFlightPlanUsers = [];

    tpcPilots.forEach(pilot => {
      const isOperatedByTPC = pilot.flight_plan?.remarks?.toUpperCase().includes('OPERATED BY THEPILOTCLUB.ORG');
      const hasTPCCallsign = pilot.callsign.toUpperCase().includes('TPC');
      const pilotInfo = `${pilot.callsign} - ${pilot.name} - ${pilot.cid}\n`;

      if (!pilot.flight_plan && hasTPCCallsign) {
        noFlightPlanUsers.push(pilotInfo);
      }
      if (isOperatedByTPC) {
        remarksUsers.push(pilotInfo);
      } else if (hasTPCCallsign) {
        callsignUsers.push(pilotInfo);
      }
    });

    if (!remarksUsers.length && !callsignUsers.length && !noFlightPlanUsers.length) {
      const emptyEmbed = new EmbedBuilder()
          .setTitle('Current Online TPC Members')
          .setDescription('No members are currently online.')
          .setColor('#37B6FF')
          .setFooter({
            text: 'Made by TPC Dev Team',
            iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
          })
          .setTimestamp();
      await interaction.reply({ embeds: [emptyEmbed] }).catch(error => sendToSentry(error, "Online Pilots Command"));
    } else {
      const embed = new EmbedBuilder()
          .setTitle('Current Online TPC Members')
          .setDescription(`**Correct Remarks:**\n${remarksUsers.join('') || 'None'}\n**Incorrect Remarks:**\n${callsignUsers.join('') || 'None'}\n**No Flight Plan:**\n${noFlightPlanUsers.join('') || 'None'}`)
          .setColor('#37B6FF')
          .setFooter({
            text: 'Made by TPC Dev Team',
            iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
          })
          .setTimestamp();
      await interaction.reply({ embeds: [embed] }).catch(error => sendToSentry(error, "Online Pilots Command"));
    }
  }
}
