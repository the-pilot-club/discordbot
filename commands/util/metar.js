import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('metar')
    .setDescription('Gives METAR for a Specific Airport').addStringOption(option =>
      option.setName('icao')
        .setDescription('The ICAO of the airport')
        .setRequired(true)),
  async execute (interaction) {
    const airport = interaction.options.getString('icao')
    const response = await fetch(`https://metar.vatsim.net/metar.php?id=${airport}`)
    const body = await response.text()
    if (body !== undefined && body !== '') {
      const metarEmbed = new EmbedBuilder()
        .setTitle('Weather Report')
        .setDescription(`${airport.toUpperCase()}`)
        .setColor('#37B6FF')
        .addFields({ name: 'METAR', value: `${body}` || 'Not Available' })
        .setFooter({ text: 'Made by TPC Dev Team', iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png' })
        .setTimestamp()
      interaction.reply({ embeds: [metarEmbed] })
    } else {
      interaction.reply("METAR isn't posted for: " + airport.toUpperCase())
    }
  }
}
