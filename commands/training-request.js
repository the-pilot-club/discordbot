const { SlashCommandBuilder } = require('discord.js')
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('training-request')
    .setDescription('Use this command if you would like to request training!'),
  async execute (interaction) {
    const modal = new ModalBuilder()
      .setCustomId('training-request')
      .setTitle('Request a training session')
    const name = new TextInputBuilder()
      .setCustomId('name')
      .setLabel('What is your Full Name?')
      .setStyle(TextInputStyle.Short)
    const cid = new TextInputBuilder()
      .setCustomId('cid')
      .setLabel('What is your VATSIM CID?')
      .setStyle(TextInputStyle.Short)
    const course = new TextInputBuilder()
      .setCustomId('course')
      .setLabel('What course are you taking?')
      .setStyle(TextInputStyle.Short)
    const time = new TextInputBuilder()
      .setCustomId('time')
      .setLabel('What is your Availability Today?')
      .setStyle(TextInputStyle.Short)
    const actionrow1 = new ActionRowBuilder().addComponents(name)
    const actionrow2 = new ActionRowBuilder().addComponents(cid)
    const actionrow3 = new ActionRowBuilder().addComponents(course)
    const actionrow4 = new ActionRowBuilder().addComponents(time)

    modal.addComponents(actionrow1, actionrow2, actionrow3, actionrow4)

    await interaction.showModal(modal)
  }
}
