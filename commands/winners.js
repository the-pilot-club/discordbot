const {SlashCommandBuilder} = require('@discordjs/builders');
const {OnAirApi} = require('onair-api');
const apiConfig = {
    apiKey: `${process.env.ON_AIR_API_KEY}`,
    companyId: process.env.ON_AIR_COMPANYID,
    vaId: process.env.ON_AIR_VAID,
};
let currentWeek = []
let previousWeek = require('../previousWeek.json')
const fs = require('fs');
const Api = new OnAirApi(apiConfig);
var testChannel = null;

async function getwinners() {
    let companyEmployees = await Api.getVirtualAirlineMembers()
    let previousHoursMap = Object.assign({}, ...previousWeek.map(x => ({[x.airline]: x.hours})));
    companyEmployees.forEach(employee => {
        currentWeek.push({
            "airline": employee.Company.AirlineCode, "name": employee.Company.Name, "hours": employee.FlightHours,
            "current_hours": employee.FlightHours - previousHoursMap[employee.Company.AirlineCode]
        });
    })
    var top = currentWeek.sort((a, b) => b.current_hours - a.current_hours).slice(0, 5).map(x => x.name).join(" \n");
    testChannel.send(top)
    previousWeek = currentWeek;
    fs.writeFile("../previousWeek.json", JSON.stringify(previousWeek), (err) => {
        if (err) throw err;
    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('winners')
        .setDescription('Replies with the charters winners!'),
    async execute(interaction) {
        testChannel = await interaction.guild.channels.fetch(process.env.TEST_CHANNEL)
        await getwinners()
        await interaction.reply({content: 'Done!', ephemeral: true});
    },
};