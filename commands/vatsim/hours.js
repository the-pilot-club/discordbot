import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
  data: new SlashCommandBuilder()
    .setName('hours')
    .setDescription('See how many hours you have on the network!'),
  async execute(interaction) {
    const response = await fetch(`https://api.vatsim.net/v2/members/discord/${interaction.user.id}`, {
      method: 'GET',
    });

    if (!response || response.status !== 200) {
      console.log(`The Response could not be completed as dialed for ${interaction.member.displayName}`);
      interaction.reply({ content: 'This Function could not be completed as dialed. Please try again later', ephemeral: true });
      return;
    }

    const body = await response.json();
    const notFound = body.detail;
    const cid = body.user_id;

    if (notFound === 'Not Found') {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Connect my account!')
            .setURL('https://community.vatsim.net')
            .setStyle(ButtonStyle.Link)
        );
      await interaction.reply({
        content: 'Please connect your VATSIM account to the VATSIM Community Hub!',
        components: [row],
        ephemeral: true,
      }).catch(err => {
        console.log(err);
      });
    } else {
      const hoursResponse = await fetch(`https://api.vatsim.net/v2/members/${cid}/stats`);

      if (!hoursResponse || hoursResponse.status !== 200) {
        console.log(`The hoursResponse could not be completed as dialed for ${interaction.member.displayName}`);
        interaction.reply({ content: 'The stats function could not be completed as dialed. Please try again later', ephemeral: true });
        return;
      }

      const hoursData = await hoursResponse.json();

      const embed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.member.displayName} - ${hoursData.id}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setTitle('Your Hours On VATSIM!')
        .addFields({ name: 'Pilot Hours:', value: `${hoursData.pilot}`, inline: true },
          { name: 'ATC Hours:', value: `${hoursData.atc}` })
        .setColor('#37B6FF')
        .setFooter({ text: 'Made by TPC Dev Team', iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png' })
        .setTimestamp();

        const labels = {
          s1: 'S1 Hours',
          s2: 'S2 Hours',
          s3: 'S3 Hours',
          c1: 'C1 Hours',
          c3: 'C3 Hours',
          i1: 'I1 Hours',
          i3: 'I3 Hours',
          sup: 'Supervisor Hours',
          adm: 'Administrator Hours',
        };
        
        for (const key in hoursData) {
          if (hoursData[key] !== 0 && labels[key] !== undefined) {
            embed.addFields({ name: labels[key], value: `${hoursData[key]}` });
          }
        }
        
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
