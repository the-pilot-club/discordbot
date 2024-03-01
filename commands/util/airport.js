import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import {sendToSentry} from "../../utils.js";

export default {
  data: new SlashCommandBuilder()
    .setName('airport')
    .setDescription('Gives information about a specific airport')
    .addStringOption(option =>
      option.setName('icao')
        .setDescription('What is the ICAO of the Airport?')
        .setRequired(true)
        .setMaxLength(4)),
  async execute (interaction) {
    interaction.deferReply()
    const airport = interaction.options.getString('icao')
    const response = await fetch(`https://metar.vatsim.net/metar.php?id=${airport}`,{
      headers: {
        'User-Agent': 'TPCDiscordBot'
      }
    }).catch(error => sendToSentry(error, 'Metar Airport Command'))
    const body = await response.text()
    const airportResponse = await fetch(`https://my.vatsim.net/api/v2/aip/airports/${airport}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'TPCDiscordBot'
      }
    }).catch(error => sendToSentry(error, 'Airport Info Airport Command'))
    const stationsResponse = await fetch(`https://my.vatsim.net/api/v2/aip/airports/${airport}/stations`, {
      method: 'GET',
      headers: {
        'User-Agent': 'TPCDiscordBot'
      }
    }).catch(error => sendToSentry(error, '/Stations Airport Command'))
    const airportBody = await airportResponse.json()
    const airportParse = airportBody.data
    const stationsBody = await stationsResponse.json()
    const stationsParse = stationsBody.data
    if (!body) {
      await interaction.editReply(`${airport.toUpperCase()} does not exist!`)
      return
    }
    if (airportResponse.status !== 200) {
      await interaction.editReply(`${airport.toUpperCase()} has no airport information provided by VATSIM. AirNav May be able to provide more information: https://www.airnav.com/airport/${airport}`)
      return
    }
    const airportEmbed = new EmbedBuilder()
      .setTitle('Airport')
      .setDescription(`Information about ${airportParse.name} (Elevation: ${airportParse.altitude_ft}ft)`)
      .setColor('#37B6FF')
      .addFields({ name: 'ICAO', value: `${airportParse.icao}` })
    if (airportParse.iata !== '') {
      airportEmbed.addFields({ name: 'IATA', value: `${airportParse.iata}` })
    }
    airportEmbed.addFields({ name: 'Region', value: `${airportParse.city}, ${airportParse.country}` },
      { name: 'Charts (AirNav)', value: `https://www.airnav.com/airport/${airport}` },
      { name: 'METAR', value: `${body}` || 'Not Available' }
    ).setFooter({
      text: 'Made by TPC Dev Team',
      iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
    })
        .setTimestamp()
    // console.log(stationsParse)
    // return
    if(stationsResponse.status === 200 && stationsParse.length !== 0){
      const stationMap = stationsParse.map(function(station) {
        station.ctaf === true ? station.ctaf = 'CTAF Frequency:' : station.ctaf = ' '

        return `- ${station.name} (${station.callsign}): **${station.ctaf}**\n  - ${station.frequency}`
      })
      airportEmbed.addFields({name: 'Frequencies', value: stationMap.length > 0 ? stationMap.join('\n') : 'Not Set'})
    }

    await interaction.editReply({ embeds: [airportEmbed] })
  }

}
