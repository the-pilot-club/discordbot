import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import {sendToSentry} from "../../utils.js";
import {Config} from "../../config/config.js";
const config = new Config()

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

    const response = await fetch(`https://aviationweather.gov/api/data/metar?ids=${airport}`,{
      headers: {
        'User-Agent': 'TPCDiscordBot'
      }
    }).catch(error => sendToSentry(error, 'Metar Airport Command'))

    const body = await response.text()

    const airportResponse = await fetch(`https://api.api-ninjas.com/v1/airports?icao=${airport}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'TPCDiscordBot',
        'X-Api-Key': config.ninjaApiKey()
      }
    }).catch(error => sendToSentry(error, 'Airport Info Airport Command'))

    const airportBody = await airportResponse.json()
    const airportParse = airportBody[0]

    const stationsResponse = await fetch(`https://my.vatsim.net/api/v2/aip/airports/${airport}/stations`, {
      method: 'GET',
      headers: {
        'User-Agent': 'TPCDiscordBot'
      }
    }).catch(error => sendToSentry(error, '/Stations Airport Command'))

    const stationsBody = await stationsResponse.json()


    if (await airportResponse.status !== 200 || airportBody.length === 0) {
      await interaction.editReply(`${airport.toUpperCase()} has no airport information provided. [SkyVector may be able to provide more information.](https://skyvector.com/api/airportSearch?query=${airport})`)
      return
    }


    function getFreq(stationsParse = stationsBody.data){
      if (stationsParse !== undefined){
        return stationsParse.map(function (station) {
          station.ctaf === true ? station.ctaf = 'CTAF Frequency:' : station.ctaf = ' '

          return `- ${station.name} (${station.callsign}): **${station.ctaf}**\n  - ${station.frequency}`
        })
      } else {
        return []
      }
    }
    const airportEmbed = new EmbedBuilder()
      .setTitle('Airport')
      .setDescription(`Information about ${airportParse.name} (Elevation: ${airportParse.elevation_ft}ft)`)
      .setColor('#37B6FF')
      .addFields({ name: 'ICAO', value: `${airportParse.icao}` })
    if (airportParse.iata !== '') {
      airportEmbed.addFields({ name: 'IATA', value: `${airportParse.iata}` })
    }
    airportEmbed.addFields({ name: 'Region', value: `${airportParse.city}, ${airportParse.region}` },
      { name: 'Charts (SkyVector)', value: `[View Charts Here](https://skyvector.com/api/airportSearch?query=${airport})` },
      { name: 'METAR', value: `${body ? body: 'Not Available'}` },
      {name: 'Frequencies', value: getFreq().length > 0 ? getFreq().join('\n') : 'None Found in VATSIM'}
    ).setFooter({
      text: 'Made by TPC Dev Team',
      iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
    })
        .setTimestamp()
      await interaction.editReply({ embeds: [airportEmbed] })
    }
}
