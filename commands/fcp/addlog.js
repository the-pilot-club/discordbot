import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Config } from '../../config/config.js';
import { sendToSentry } from '../../utils.js';

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
    if (
        interaction.member.roles.cache.some(role => role.name === 'Staff') ||
        interaction.member.roles.cache.some(role => role.name === 'Air Marshals')
    ) {
      try {
        const user = interaction.options.getUser("user");
        const logReason = interaction.options.getString("log-reason");

        const addLogUrl = `${Config.fcpBaseUrl()}/api/users/find/${user.id}/audit-logs/new`;

        const addAuditLog = async () => {
          return await fetch(addLogUrl, {
            method: 'POST',
            headers: {
              'User-Agent': 'AddLog command',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${process.env.FCP_TOKEN}`,
            },
            body: JSON.stringify({
              'user_id': user.id,
              'submitted_by': interaction.user.id,
              'text': logReason,
            }),
          });
        };

        let response = await addAuditLog();

        if (response.status === 422) {

          const createUserUrl = `${Config.fcpBaseUrl()}/api/users/new`;

          const createUserResponse = await fetch(createUserUrl, {
            method: 'POST',
            headers: {
              'User-Agent': 'TPCDiscordBot',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${process.env.FCP_TOKEN}`,
            },
            body: JSON.stringify({
              'id': user.id,
            }),
          });

          if (!createUserResponse.ok) {
            const errorText = await createUserResponse.text();
            const error = new Error(`Failed to create FCP account. Status: ${createUserResponse.status}, Response: ${errorText}`);
            await sendToSentry(error, "Audit log command - Create User");
            return;
          }
          response = await addAuditLog();

          if (response.status === 422) {
            const error = new Error(`Failed to add audit log after creating user. Status: ${response.status}`);
            await sendToSentry(error, "Audit log command - Add Audit Log After User Creation");
            return;
          }
        }

        if (!response.ok) {
          const errorText = await response.text();
          const error = new Error(`HTTP error. Status: ${response.status}, Response: ${errorText}`);
          await sendToSentry(error, "Audit log command - HTTP Error");
          return;
        }
        const successEmbed = new EmbedBuilder()
            .setAuthor({
              name: `${interaction.member.displayName}`,
              iconURL: `${interaction.user.displayAvatarURL()}`,
            })
            .setDescription(`Successfully created a new audit log for ${user}.`)
            .setColor("#22bb33")
            .setFooter({
              text: "Made by TPC Dev Team",
              iconURL: "https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png",
            })
            .setTimestamp();

        await interaction.reply({
          embeds: [successEmbed] ,
          ephemeral: true,
        });
      } catch (error) {
        await interaction.reply({
          content: "There was an error while attempting to add the log. Please try again later.",
          ephemeral: true,
        });
        sendToSentry(error, "Audit log command");
      }
    } else {
      await interaction.reply({
        content: "You don't have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};