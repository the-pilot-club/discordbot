import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('charters-ferry-request')
    .setDescription('Use this command to request an aircraft to be ferried to another location.'
    ),
  async execute (interaction) {
    const modal = new ModalBuilder()
      .setCustomId('charter-ferry')
      .setTitle('Ferry a TPC Charters Aircraft')
    const tail = new TextInputBuilder()
      .setCustomId('aircraft-registration')
      .setLabel('What is the Tail Number?')
      .setStyle(TextInputStyle.Short)
    const start = new TextInputBuilder()
      .setCustomId('starting-icao')
      .setLabel('What is your starting location?')
      .setStyle(TextInputStyle.Short)
    const end = new TextInputBuilder()
      .setCustomId('ending-icao')
      .setLabel('What is your ending location?')
      .setStyle(TextInputStyle.Short)
    const actionrow1 = new ActionRowBuilder().addComponents(tail)
    const actionrow2 = new ActionRowBuilder().addComponents(start)
    const actionrow3 = new ActionRowBuilder().addComponents(end)

    modal.addComponents(actionrow1, actionrow2, actionrow3)

    await interaction.showModal(modal)
  }
}
