import {
    SlashCommandBuilder,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    EmbedBuilder
  } from "discord.js";
  
  export default {
    data: new SlashCommandBuilder()
      .setName("charters-join")
      .setDescription("Use this command if you would like to join TPC Charters"),
    async execute(interaction) {
      const notOnboarded = new EmbedBuilder()
        .setColor('0xff0000')
        .setTitle("Onboarding Required")
        .setDescription(
          `To join Charters, you have to be onboarded into the club. Please read our SOP and click the button at the end to onboard, and then run this command again.`,
        );
      const modal = new ModalBuilder()
        .setCustomId("join-charters")
        .setTitle("Join TPC Charters");
      const airlinecode = new TextInputBuilder()
        .setCustomId("airlinecode")
        .setLabel("What is your Airline Code?")
        .setStyle(TextInputStyle.Short);
      const homebase = new TextInputBuilder()
        .setCustomId("homebase")
        .setLabel("What is your home base?")
        .setStyle(TextInputStyle.Short);
      const aircraft = new TextInputBuilder()
        .setCustomId("aircraft")
        .setLabel("What is the aircraft type you would like?")
        .setStyle(TextInputStyle.Short);
      const seating = new TextInputBuilder()
        .setCustomId("seating")
        .setLabel("What is the Seating Config you would like?")
        .setStyle(TextInputStyle.Short);
      const actionrow1 = new ActionRowBuilder().addComponents(airlinecode);
      const actionrow2 = new ActionRowBuilder().addComponents(homebase);
      const actionrow3 = new ActionRowBuilder().addComponents(aircraft);
      const actionrow4 = new ActionRowBuilder().addComponents(seating);
  
      modal.addComponents(actionrow1, actionrow2, actionrow3, actionrow4);
      if (
        interaction.member.roles.cache.some((role) => role.name === "Onboarded")
      ) {
        await interaction.showModal(modal);
      } else {
        await interaction.reply({ embeds: [notOnboarded], ephemeral: true });
      }
    },
  };
  