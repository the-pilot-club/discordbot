const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sync')
        .setDescription('Sync your VATSIM Ratings for TPC!'),
    async execute(interaction) {
//         const response = await fetch(`https://callsigns.thepilotclub.org/ServiceOperations.asmx`, {
//             method : 'POST',
//             headers:{'Content-Type': 'text/xml;charset=UTF-8'},
//             body: `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
//   <soap:Body>
//     <GetVatsimHrsInfo xmlns="http://tempuri.org/"
//       <DiscordId>${interaction.user.id}</DiscordId>
//     </GetVatsimHrsInfo>
//   </soap:Body>
// </soap:Envelope>`,
//         })
//         const body = await response.text();
//         console.log(body)
        // if (body !== undefined && body !== '') {
        //     interaction.reply(`${body}`)
        // } else {
             interaction.reply("What is this command? The world may never know 😉 ")
        // }
        // ;
    },
};