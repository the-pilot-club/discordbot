const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-online-members')
        .setDescription('Gets the members who are online'), async execute(interaction) {
        const remarksUsers = []
        const callsignUsers = []
        const livemembersResponse = await fetch(`https://data.vatsim.net/v3/vatsim-data.json`);
        const liveMembers = await livemembersResponse.json()
        const tpcPilots = liveMembers.pilots
        //getting remarks with OPERATED BY THEPILOTCLUB.ORG
        const remakrsFiltered = tpcPilots.filter(tpcPilots => tpcPilots.flight_plan?.remarks.toUpperCase().indexOf("OPERATED BY THEPILOTCLUB.ORG") > -1)
        const callsignFiltered = tpcPilots.filter(tpcPilots => tpcPilots.callsign.indexOf("TPC") > -1)
        //callsign's loop through each array
        if (remakrsFiltered.length === 0) {
            remarksUsers.push('No one has their remarks set correctly')
        }
        if (remakrsFiltered.length !== 0) {
            for (let i = 0; i < remakrsFiltered.length; i++) {
                let remarkObj = remakrsFiltered[i];
                remarksUsers.push(remarkObj.callsign, ' - ', remarkObj.name, " - ", remarkObj.cid, '\n');
            }
        }
        if (callsignFiltered === 0) {
            callsignUsers.push('No one is flying with a TPC callsign')
        }
        if (callsignFiltered !== 0) {
            for (let i = 0; i < callsignFiltered.length; i++) {
                let callsignObj = callsignFiltered[i]
                callsignUsers.push(callsignObj.callsign, ' - ', callsignObj.name, ' - ', callsignObj.cid, '\n')
            }
        }
        const embed = new EmbedBuilder()
            .setTitle('Current Online TPC Members')
            .setDescription(`Correct Remarks: \n${remarksUsers.join('')}\n No Remarkss:\n ${callsignUsers.join('')}`)
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