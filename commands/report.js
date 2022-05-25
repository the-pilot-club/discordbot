const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents, Interaction } = require('discord.js');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Use this commnad to report a user.')
            .addStringOption(option =>
            option.setName('user').setDescription('who is the user that you would like to report').setRequired(true))
                .addStringOption(option=>
                option.setName('reason').setDescription('What happened with this user').setRequired(true)),
	async execute(interaction,client) {
    const channel = interaction.guild.client.channels.cache.get('865416768641433630')
    const user = interaction.options.getString('user')
    const reason = interaction.options.getString('reason')
    const embed = new MessageEmbed()
    .setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.displayAvatarURL()}`})
    .setTitle('New Report')
    .setDescription( 'A member of TPC has submitted a report for moderation review.')
    .setColor('0XFF0000')
    .addFields({name:'Detailed Report', value: `**User Reporting:** ${interaction.user} (ID: ${interaction.user.id}) \n  **User Reported:** ${user} \n **Reason:** ${reason} \n **Channel:** ${interaction.channel} \n **Last Messages Sent:** [Jump To Content](https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id})`})
    .setFooter({text: 'Made by The Pilot Club For Moderators'});
    channel.send({embeds: [embed]})
    await interaction.reply({content:`You have reported ${user} for ${reason}. A moderator will deal with this as soon as we can. If this is urgent, please ping Ground Crew as soon as possible.`, ephemeral: true}
    )
  }
}
