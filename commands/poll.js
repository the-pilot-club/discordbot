const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Create a Poll!').addStringOption(option =>
        option.setName('question')
                .setDescription('What is your question?')
                .setRequired(true)).addStringOption(option =>
                        option.setName('answer_a')
                        .setDescription('a possible answer')
                        .setRequired(true)).addStringOption(option =>
                                option.setName('answer_b')
                                .setDescription('another possible answer')
                                .setRequired(true)).addStringOption(option =>
                                        option.setName('answer_c')
                                        .setDescription('another possible answer')
                                        .setRequired(false)),
	async execute(interaction) {
        const question = interaction.options.getString('question')
        var answer_a = interaction.options.getString('answer_a')
        var answer_b = interaction.options.getString('answer_b')
        var answer_c = interaction.options.getString('answer_c')
        if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')){
        newSend = 
        `**TPC POLL:** \n \n  ${question} \n
  🇦: ${answer_a}
  🇧: ${answer_b}
  🇨: ${answer_c}`
        const message = await interaction.reply({ content: newSend, fetchReply: true });
        message.react('🇦')
          .then(() => message.react('🇧'))
          .then(() => message.react('🇨'))
          .catch(error => console.error('One of the emojis failed to react:', error));
        } else {
          await interaction.reply("You need to be staff to use /poll!")
        }

    }}