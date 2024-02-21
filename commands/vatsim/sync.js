import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import {sendToSentry} from "../../utils.js";
export default {
  data: new SlashCommandBuilder()
    .setName('sync')
    .setDescription('Sync your VATSIM Ratings for TPC!'),
  async execute (interaction) {
    const response = await fetch(`https://api.vatsim.net/v2/members/discord/${interaction.user.id}`, {
      method: 'GET'
    })
    if (!response) {
      console.log(`The Response could not be completed as dialed for ${interaction.member.displayName}`)
      interaction.reply({ content: 'This Function could not be completed as dialed. Please try again later', ephemeral: true })
      return
    }
    const body = await response.json()
    const notFound = body.detail
    const cid = body.user_id
    if (notFound === 'Not Found') {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Connect my account!')
            .setURL('https://community.vatsim.net')
            .setStyle(ButtonStyle.Link)
        )
      await interaction.reply({
        content: 'Please connect your VATSIM account to the VATSIM Community Hub!',
        components: [row],
        ephemeral: true
      }).catch(err => {  sendToSentry(err, "Sync Command") })
    } else {
      const ratingResponse = await fetch(`https://api.vatsim.net/v2/members/${cid}`)
      if (!ratingResponse || ratingResponse.status !== 200) {
        console.log(`The ratingResponse could not be completed as dialed for ${interaction.member.displayName}`)
        return
      }
      const ratingBody = await ratingResponse.json()
      const rating = ratingBody.rating
      const pilotrating = ratingBody.pilotrating
      const roles = []
      const MANAGED_ROLES = ['ATC', 'S1', 'S2', 'S3', 'C1', 'C3', 'I1', 'I3', 'Network Supervisor', 'Network Administrator', 'P0', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6']
      switch (rating) {
        case 2: // S1
          roles.push('ATC')
          roles.push('S1')
          break
        case 3: // S2
          roles.push('ATC')
          roles.push('S2')
          break
        case 4: // S3
          roles.push('ATC')
          roles.push('S3')
          break
        case 5: // C1
          roles.push('ATC')
          roles.push('C1')
          break
        case 7: // C3
          roles.push('ATC')
          roles.push('C3')
          break
        case 8: // I1
          roles.push('ATC')
          roles.push('I1')
          break
        case 10: // I3
          roles.push('ATC')
          roles.push('I3')
          break
        case 11: // SUP
          roles.push('Network Supervisor')
          roles.push('ATC')
          break
        case 12: // ADM
          roles.push('Network Administrator')
      }
      switch (pilotrating) {
        case 0:
          roles.push('P0')
          break
        case 1:
          roles.push('P1')
          break
        case 3:
          roles.push('P2')
          break
        case 7:
          roles.push('P3')
          break
        case 15:
          roles.push('P4')
          break
        case 31:
          roles.push('P5')
          break
        case 63:
          roles.push('P6')
      }
      const joinRoles = roles.join(', ')
      const embed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setTitle('Your roles have been assigned!')
        .setDescription(`${joinRoles}`)
        .setColor('#37B6FF')
        .setFooter({
          text: 'Made by TPC Dev Team',
          iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
        })
        .setTimestamp()
      await interaction.reply({ embeds: [embed] }).catch(err => {  sendToSentry(err, "Sync Command") })

      for (const role of MANAGED_ROLES) {
        const discordRole = interaction.member.guild.roles.cache.find(r => r.name === role)
        if (roles.includes(role)) {
          if (!interaction.member.roles.cache.some(r => r.name === role)) {
            interaction.member.roles.add(discordRole).catch(e => sendToSentry(e, "Sync Command"))
          }
        } else {
          if (interaction.member.roles.cache.some(r => r.name === role)) {
            interaction.member.roles.remove(discordRole).catch(e => sendToSentry(e, "Sync Command"))
          }
        }
      }
    }
  }
}
