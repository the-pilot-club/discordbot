const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('charters-join')
        .setDescription('Use this command if you would like to join TPC Charters'),
    async execute(interaction) {
        const modal  = new Modal()
            .setCustomId('join-charters')
            .setTitle('Join TPC Charters')
        const airlinecode = new TextInputComponent()
            .setCustomId('airlinecode')
            .setLabel('What is your Airline Code?')
            .setStyle('SHORT')
        const homebase = new TextInputComponent()
            .setCustomId('homebase')
            .setLabel('What is your home base?')
            .setStyle('SHORT')
        const aircraft = new TextInputComponent()
            .setCustomId('aircraft')
            .setLabel('What is the aircraft type you would like?')
            .setStyle('SHORT')
        const seating = new TextInputComponent()
            .setCustomId('seating')
            .setLabel('What is the Seating Config you would like?')
            .setStyle('SHORT')
        const actionrow1 = new MessageActionRow().addComponents(airlinecode)
        const actionrow2 = new MessageActionRow().addComponents(homebase)
        const actionrow3 = new MessageActionRow().addComponents(aircraft)
        const actionrow4 = new MessageActionRow().addComponents(seating)

        modal.addComponents(actionrow1,actionrow2,actionrow3,actionrow4)

        await interaction.showModal(modal);
    },
};

//airline code
//home base
//aircraft type
//seating config