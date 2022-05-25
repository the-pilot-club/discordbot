const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a Poll!').addStringOption(option =>
        option.setName('question')
        .setDescription('What is your question?')
        .setRequired(true)
    ).addStringOption(option =>
        option.setName('answer_a')
        .setDescription('a possible answer')
        .setRequired(true)
    ).addStringOption(option =>
        option.setName('answer_b')
        .setDescription('another possible answer')
        .setRequired(true)
    ).addStringOption(option =>
        option.setName('answer_c')
        .setDescription('another possible answer')
        .setRequired(false)
    ).addStringOption(option =>
        option.setName('answer_d')
        .setDescription('another possible answer')
        .setRequired(false)
    ).addStringOption(option =>
        option.setName('answer_e')
        .setDescription('another possible answer')
        .setRequired(false)
    ),
	async execute(interaction) {
        const question = interaction.options.getString('question')
        let answer_a = interaction.options.getString('answer_a')
        let answer_b = interaction.options.getString('answer_b')
        let answer_c = interaction.options.getString('answer_c')
        let answer_d = interaction.options.getString('answer_d')
        let answer_e = interaction.options.getString('answer_e')
        if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')){
            newSend = `**TPC POLL:** \n ${question} \n \n 🇦: ${answer_a} \n 🇧: ${answer_b}`
            if (answer_c !== null){
                newSend += `\n 🇨: ${answer_c}`
            } if (answer_d !== null){
                newSend += `\n 🇩: ${answer_d}`
            } if (answer_e !== null){
                newSend += `\n 🇪: ${answer_e}`
            }  
            const message = await interaction.reply({ content: newSend, fetchReply: true });
            message.react('🇦')
            .then(() => message.react('🇧'))
            .then(() => {
                if (answer_c !== null){
                    message.react('🇨')
                }
            }).then(() => {
                if (answer_d !== null){
                    message.react('🇩')
                }
            }).then(() => {
                if (answer_e !== null){
                    message.react('🇪')
                }
            })
            .catch(error => console.error('One of the emojis failed to react:', error));
        } else {
            await interaction.reply("You need to be staff to use /poll!")
        }
    }
}