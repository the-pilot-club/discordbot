import {EmbedBuilder, SlashCommandBuilder} from 'discord.js'
import fetch from 'node-fetch'
import {Config} from "../../config/config.js";
import {sendToSentry} from "../../utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName('get-callsign')
        .setDescription('Get a member\'s TPC Callsign').addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get the callsign of')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const response = await fetch(`${Config.fcpBaseUrl()}/api/users/find/${user.id}/callsign`, {
            method: 'GET',
        });

        if (!response || response.status !== 200) {
            console.log(`The Response could not be completed as dialed for ${interaction.member.displayName}`);
            interaction.reply({ content: 'This Function could not be completed as dialed. Please try again later', ephemeral: true });
            return;
        }

        const body = await response.json();
        const notFound = body.detail;
        const callsign = body.tpcCallsign;

        if (notFound === 'Not Found') {
            await interaction.reply({
                content: `A TPC callsign was not found for ${user}.`,
                ephemeral: true,
            }).catch(err => {
                sendToSentry(err, "FCP Get Callsign");
            });
        } else {
            const successEmbed = new EmbedBuilder()
                .setAuthor({ name: `${member.displayName}`, iconURL: `${user.displayAvatarURL()}` })
                .setDescription(`TPC Callsign: ${callsign ? callsign: "Not Set"}`)
                .setColor('#37B6FF')
                .setFooter({
                    text: 'Made by TPC Dev Team',
                    iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
                })
                .setTimestamp()
            await interaction.reply({ embeds: [successEmbed]});
        }
    },
};