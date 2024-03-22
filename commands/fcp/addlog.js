import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import { Config } from '../../config/config.js';
import { sendToSentry } from '../../utils.js';

const config = new Config();

export default {
  data: new SlashCommandBuilder()
    .setName('add-log')
    .setDescription('Add a FCP audit log to a member')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to add the log to')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('log-reason')
        .setDescription('Log content')
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const logReason = interaction.options.getString("log-reason");
    
    const response = await fetch(`${config.fcpBaseUrl()}/api/users/find/${user.id}/audit-logs/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.FCP_TOKEN}`
        },
        body: JSON.stringify({
            staffId: interaction.user.id,
            log: logReason,
        }),
    });


    if (!response || response.status !== 202) {
      console.log(response.status)
      console.log(
        `The Response could not be completed as dialed for ${interaction.member.displayName}`,
      );
      interaction.reply({
        content:
          "This Function could not be completed as dialed. Please try again later",
        ephemeral: true,
      });
      return;
    }

    const body = await response.json();
    const notFound = body.detail;

    if (notFound === "Not Found") {
     // TODO: Create a FCP account if user doesn't exist
    } else {
      const successEmbed = new EmbedBuilder()
        .setAuthor({
          name: `${interaction.member.displayName}`,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        })
        .setDescription(`Successfully created a new audit log for ${user}.`)
        .setColor("#22bb33")
        .setFooter({
          text: "Made by TPC Dev Team",
          iconURL:
            "https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png",
        })
        .setTimestamp();
      await interaction.reply({ embeds: [successEmbed] });
    }
  },
};
