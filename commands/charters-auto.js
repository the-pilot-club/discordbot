const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('auto-pirep')
        .setDescription('runs the on air pirep'),
    async execute(interaction) {
const id = process.env.ON_AIR_COMPANYID
const response = await fetch(`https://server1.onair.company/api/v1/company/${id}/`);
const body = await response.text();
    console.log(body)
    interaction.reply('done')
    },
};
