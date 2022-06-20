const { SlashCommandBuilder } = require('@discordjs/builders');
const { OnAirApi } = require('onair-api');
const currentWeek = require('../currentWeek.json');
const fs = require('fs');
const apiConfig = {
	apiKey: "e4e41811-e560-4fd8-8189-c73316faf690",
	companyId: "d88495ec-7a27-4ca7-95c5-370e7a7a9f14",
	vaId: "d88495ec-7a27-4ca7-95c5-370e7a7a9f14",
};

// instantiate the OnAirApi
const Api = new OnAirApi(apiConfig);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mosthours')
		.setDescription('Replies with the pilots with the most hours flown on the TPC VA!'),
	async execute(interaction) {
		//console.log(companyEmployees)
		
		await interaction.reply("test");
	},
};