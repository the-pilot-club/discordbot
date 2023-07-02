const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('airport')
        .setDescription('Gives information about a specific airport')
        .addStringOption(option =>
            option.setName('icao')
                .setDescription('What is the ICAO of the Airport?')
                .setRequired(true)
                .setMaxLength(4)),
    async execute(interaction) {
        const airport = interaction.options.getString('icao')
        const response = await fetch(`https://metar.vatsim.net/metar.php?id=${airport}`);
        const body = await response.text();
        const airportResponse = await fetch(`https://api.api-ninjas.com/v1/airports?icao=${airport}`, {
            method: 'GET',
            headers: {
                "X-Api-Key": process.env.NINJA_API_KEY,
            }
        })
        const airportBody = await airportResponse.json()
        const airportParse = airportBody[0]
        if (!body) {
            interaction.reply(`${airport} does not exist!`);
            return;
        }
        if (airportResponse.status !== 200) {
            interaction.reply(`${airport} Error`)
        }
        let airportEmbed = new EmbedBuilder()
            .setTitle('Airport')
            .setDescription(`Information about ${airportParse.name} (Elevation: ${airportParse.elevation_ft})`)
            .setColor(`#37B6FF`)
            .addFields({name: `ICAO`, value: `${airportParse.icao}`})
        if (airportParse.iata !== "") {
            airportEmbed.addFields({name: `IATA`, value: `${airportParse.iata}`})
        }
        airportEmbed.addFields({name: `Region`, value: `${airportParse.city}, ${airportParse.region}`},
            {name: `Charts (AirNav)`, value: `https://www.airnav.com/airport/${airport}`},
            {name: 'METAR', value: `${body}` || `Not Available`}
        )
            .setFooter({
                text: `Made by TPC Dev Team`,
                iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`
            })
            .setTimestamp()
        interaction.reply({embeds: [airportEmbed]});
    }
    ,
}
;