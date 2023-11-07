const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
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
        return;
      }

      const hoursData = await hoursResponse.json();

      const embed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.member.displayName} - ${cid}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setTitle('Your Hours On VATSIM!')
        .addFields({ name: 'Pilot Hours:', value: `${hoursData.pilot}`, inline: true },
          { name: 'ATC Hours:', value: `${hoursData.atc}` })
        .setColor('#37B6FF')
        .setFooter({ text: 'Made by TPC Dev Team', iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png' })
        .setTimestamp();

      if (hoursData.s1 !== 0) {
        embed.addFields({ name: 'S1 Hours:', value: `${hoursData.s1}` });
      }
      if (hoursData.s2 !== 0) {
        embed.addFields({ name: 'S2 Hours:', value: `${hoursData.s2}` });
      }
      if (hoursData.s3 !== 0) {
        embed.addFields({ name: 'S3 Hours:', value: `${hoursData.s3}` });
      }
      if (hoursData.c1 !== 0) {
        embed.addFields({ name: 'C1 Hours:', value: `${hoursData.c1}` });
      }
      if (hoursData.c3 !== 0) {
        embed.addFields({ name: 'C3 Hours:', value: `${hoursData.c3}` });
      }
      if (hoursData.i1 !== 0) {
        embed.addFields({ name: 'I1 Hours:', value: `${hoursData.i1}` });
      }
      if (hoursData.i3 !== 0) {
        embed.addFields({ name: 'I3 Hours:', value: `${hoursData.i3}` });
      }
      if (hoursData.sup !== 0) {
        embed.addFields({ name: 'Supervisor Hours:', value: `${hoursData.sup}` });
      }
      if (hoursData.adm !== 0) {
        embed.addFields({ name: 'Administrator Hours:', value: `${hoursData.adm}` });
      }
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
