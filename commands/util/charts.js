import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import cheerio from 'cheerio';
import airac from "airac-cc";
import {sendToSentry} from "../../utils.js";

const listOne = async (icao, chartType) => {
  try {
    const searchCycle = airac.Cycle.fromDate(new Date()).identifier;
    console.log(new Date())
    console.log(searchCycle)
    const url = `https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/dtpp/search/results/?cycle=${searchCycle}&ident=${icao}&sort=type&dir=asc`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    return parse(html, chartType);
  } catch (error) {
    console.log(error)
    sendToSentry(error, 'Charts Command');
    console.error(`Error fetching diagrams for ${icao}:`, error);
    throw error;
  }
};

const parse = (html, chartType) => {
  const $ = cheerio.load(html);
  const $resultsTable = $('#resultsTable');

  if (!$resultsTable.html()) {
    console.error('Unable to parse the #resultsTable page element');
    return [];
  }

  const results = $resultsTable
    .find('tr')
    .toArray()
    .filter(row => isDiagramRow($(row), chartType))
    .map(row => extractRow($(row)))
    .filter(x => !!x);
  return results;
};

const text = ($row, columnIndex) =>
  $row
    .find(`td:nth-child(${columnIndex})`)
    .text()
    .trim();

const link = ($row, columnIndex) =>
  $row
    .find(`td:nth-child(${columnIndex})`)
    .find('a')
    .attr('href');

const extractRow = ($row) => {
  return {
    state: text($row, 1),
    city: text($row, 2),
    airport: text($row, 3),
    ident: text($row, 4),
    vol: text($row, 5),
    flag: text($row, 6),
    procedure: {
      name: text($row, 8),
      url: link($row, 8)
    },
    compare: {
      name: text($row, 9),
      url: link($row, 9)
    }
  };
};

const isDiagramRow = ($row, chartType) => {
  if (!chartType) return true;
  return text($row, 7) === chartType;
};

async function airportDiagrams(icaos, chartType = {}) {
  try {
    if (Array.isArray(icaos)) {
      return Promise.all(icaos.map(icao => listOne(icao, chartType)));
    }
    return listOne(icaos, chartType);
  } catch (error) {
    sendToSentry(error, 'Charts Command');
    console.error('Error fetching airport diagrams:', error);
    throw error;
  }
}

export default {
  data: new SlashCommandBuilder()
    .setName('charts')
    .setDescription('Displays the charts of an airport.')
    .addStringOption(option =>
      option.setName('icao')
        .setDescription('The ICAO code of the airport')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('charttype')
        .setDescription('The type of chart to retrieve')
        .setRequired(true)
        .addChoices(
          { name: 'Airport Diagram', value: 'APD' },
          { name: 'Departure Procedure', value: 'DP' },
          { name: 'STARs', value: 'STAR' },
          { name: 'Hot Spot', value: 'HOT' },
          { name: 'Instrument Approach Procedures', value: 'IAP' },
          { name: 'Land and Hold Short Procedures', value: 'LAH' },
          { name: 'Minimums', value: 'MIN' },
          { name: 'Obstacle Departure Procedures', value: 'ODP' },
        )),
  async execute(interaction) {
    await interaction.deferReply();
    try {
      const icaoCode = interaction.options.getString('icao').toUpperCase();
      const chartType = interaction.options.getString('charttype')?.toUpperCase();
            const diagrams = await airportDiagrams(icaoCode, chartType);

            if (diagrams && diagrams.length > 0) {
              const diagramsEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`Airport Diagrams for ${icaoCode}`)
                .setDescription('Here are the available diagrams:')
                .addFields(diagrams.map(diagram => ({
                  name: diagram.procedure.name,
                  value: diagram.procedure.url,
                  inline: true
                })))
                .setTimestamp();

              await interaction.editReply({ embeds: [diagramsEmbed] });
            } else {
              await interaction.editReply(`${icaoCode.toUpperCase()} has no available charts online. [SkyVector may be able to provide more information.](https://skyvector.com/api/airportSearch?query=${icaoCode})`);
            }
          } catch (error) {
            sendToSentry(error, 'Charts Command');
            console.error('Error executing the command:', error);
            await interaction.editReply(`${icaoCode.toUpperCase()} has no available charts online. [SkyVector may be able to provide more information.](https://skyvector.com/api/airportSearch?query=${icaoCode})`);
          }
        },
      };