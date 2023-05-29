const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('update-status')
    .setDescription('Update the status message')
    .addStringOption(option =>
      option.setName('subject')
        .setDescription('What is the subject of the web service issue?')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('status-color-1')
        .setDescription('What is the status of the websites?')
        .setRequired(true)
        .addChoices(
          { name: '🟢', value: '🟢' },
          { name: '🟡', value: '🟡' },
          { name: '🔴', value: '🔴' }
        )
    )
    .addStringOption(option =>
      option.setName('description-1')
        .setDescription('What is the Description of the Status?')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('status-color-2')
        .setDescription('What is the status of the websites?')
        .setRequired(false)
        .addChoices(
          { name: '🟢', value: '🟢' },
          { name: '🟡', value: '🟡' },
          { name: '🔴', value: '🔴' }
        )
    )
    .addStringOption(option =>
      option.setName('description-2')
        .setDescription('What is the Description of the Status?')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('status-color-3')
        .setDescription('What is the status of the websites?')
        .setRequired(false)
        .addChoices(
          { name: '🟢', value: '🟢' },
          { name: '🟡', value: '🟡' },
          { name: '🔴', value: '🔴' }
        )
    )
    .addStringOption(option =>
      option.setName('description-3')
        .setDescription('What is the Description of the Status?')
        .setRequired(false)
    ),

  async execute(interaction) {
    const messageId = interaction.options.getString('message_id');
    const subject = interaction.options.getString('subject');
    const color1 = interaction.options.getString('status-color-1');
    const desc1 = interaction.options.getString('description-1');
    const color2 = interaction.options.getString('status-color-2');
    const desc2 = interaction.options.getString('description-2');
    const color3 = interaction.options.getString('status-color-3');
    const desc3 = interaction.options.getString('description-3');

   
  try {
    const channel = interaction.guild.channels.cache.get('830202868892041226');
    if (!channel) {
      return interaction.reply('Unable to find the specified channel.');
    }

    const messages = await channel.messages.fetch({ limit: 1 });
    const message = messages.first();

    if (!message) {
      return interaction.reply('No messages found in the specified channel.');
    }

      const embed = new EmbedBuilder()
        .setTitle(subject)
        .setAuthor({
          name: 'The Pilot Club',
          iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`,
                url: `https://thepilotclub.org`
            })
            .addFields({
                name: `${color1}   ${desc1}`,
                value: `\u200b`
            })
            .setColor('#37B6FF')
            .setTimestamp();
        const embed2 = new EmbedBuilder()
            .setTitle(`${subject}`)
            .setAuthor({
                name: `The Pilot Club`,
                iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`,
                url: `https://thepilotclub.org`
            })
            .addFields(
                {name: `${color1}   ${desc1}`, value: `\u200b`},
                {name: `${color2}   ${desc2}`, value: `\u200b`})
            .setColor('#37B6FF')
            .setTimestamp();
        const embed3 = new EmbedBuilder()
            .setTitle(`${subject}`)
            .setAuthor({
                name: `The Pilot Club`,
                iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`,
                url: `https://thepilotclub.org`
            })
            .addFields(
        {name: `${color1}   ${desc1}`, value: `\u200b`},
            {name: `${color2}   ${desc2}`, value: `\u200b`},
            {name:`${color3}   ${desc3}`, value: `\u200b`})
            .setColor('#37B6FF')
            .setTimestamp();

           if (desc2 == null) {
        await message.edit({ embeds: [embed] });
      }
      if (desc2 !== null && desc3 == null) {
        await message.edit({ embeds: [embed2] });
      }
      if (desc2 !== null && desc3 !== null) {
        await message.edit({ embeds: [embed3] });
      }
      
        await interaction.reply({content :'Done!' , ephemeral: true});
    }
      catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while executing the command.');
    }
    }
}
