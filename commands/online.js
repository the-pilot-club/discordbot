const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-online-members')
        .setDescription('Gets the members who are online'), async execute(interaction) {
        const remarksUsers = []
        const websiteUsers = []
        const livemembersResponse = await fetch(`https://data.vatsim.net/v3/vatsim-data.json`);
        const liveMembers = await livemembersResponse.json()
        const tpcPilots = liveMembers.pilots
        //getting remarks with OPERATED BY THEPILOTCLUB.ORG
        const remakrsFiltered = tpcPilots.filter(tpcPilots => tpcPilots.flight_plan?.remarks.toUpperCase().indexOf("OPERATED BY THEPILOTCLUB.ORG") > -1)
        const websiteFiltered = tpcPilots.filter(tpcPilots => tpcPilots.flight_plan?.remarks.toUpperCase().indexOf("THEPILOTCLUB.ORG") > -1)
        //callsign's loop through each array
        if (remakrsFiltered.length === 0 && websiteFiltered.length === 0) {
            await interaction.reply({
                content: `No one is online :(`
            }).catch(error => console.error(error))
        } else if (remakrsFiltered.length !== 0) {
            for (let i = 0; i < remakrsFiltered.length; i++) {
                let remarkObj = remakrsFiltered[i];
                console.log(remarkObj.callsign)
                remarksUsers.push(remarkObj.callsign, ' - ', remarkObj.name, " - ", remarkObj.cid, '\n');
            }
        } else if (websiteFiltered.length !== 0) {
            for (let i = 0; i < websiteFiltered.length; i++) {
                let websiteObj = websiteFiltered[i]
                console.log("wesbite only users", websiteObj.callsign)
                websiteUsers.push(websiteObj.callsign, ' - ', websiteObj.name, ' - ', websiteObj.cid, '\n')
            }
        }
        const embed = new EmbedBuilder()
            .setTitle('Current Online TPC Members')
            .setDescription(`Correct Remarks: \n${remarksUsers.join('')}\n Website Only:\n ${websiteUsers.join('')}`)
            .setColor(`#37B6FF`)
            .setFooter({
                text: `Made for The Pilot Club`,
                iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`
            })
            .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        }).catch(error => console.error(error))
    }

}
;