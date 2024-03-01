import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import fetch from 'node-fetch'
import {sendToSentry} from "../../utils.js";
import {Config} from "../../config/config.js";
const config = new Config()

export default {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Get a member\'s FCP Info').addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get the information of')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const response = await fetch(`${config.fcpBaseUrl()}/api/users/find/${user.id}`, {
            method: 'GET',
        });


        if (response.status === 404) {
            console.log(`${user.displayName} does not have a FCP account.`);
            interaction.reply({ content: `${user.displayName} does not have a FCP account.`, ephemeral: true });
            return;
        }

        if (!response || response.status !== 200) {
            console.log(`The Response could not be completed as dialed for ${interaction.member.displayName}`);
            interaction.reply({ content: 'This Function could not be completed as dialed. Please try again later', ephemeral: true });
            return;
        }

        const body = await response.json();
        const { callsign, vatsimCid, homeAirport, chartersCode, bio, aircraftHangar } = body;
        const notFound = body.detail;
        const aircraftDetails = aircraftHangar.map(({ aircraftName }) => `- ${aircraftName}`);

        if (notFound === 'Not Found') {
            await interaction.reply({
                content: `A FCP account was not found for ${user}.`,
                ephemeral: true,
            }).catch(err => {
                sendToSentry(err, "FCP User Info");
            });
        } else {
            const successEmbed = new EmbedBuilder()
                .setAuthor({ name: `${user.displayName}`, iconURL: `${user.displayAvatarURL()}` })
                .setTitle(`${user.displayName}'s FCP Details`)
                .addFields(
                    { name: 'TPC Callsign', value: `TPC${callsign ? callsign: 'Not Set'}`},
                    { name: 'Vatsim CID:', value: `${ vatsimCid ? vatsimCid: 'Not Set'}`},
                    { name: 'Home Airport', value: homeAirport ? homeAirport: 'Not Set'},
                    { name: 'Charters Code', value: chartersCode ? chartersCode: 'Not Set'},
                    { name: 'Bio', value: bio ? bio: 'Not Set'},
                    { name: 'Aircraft Hanger', value: aircraftDetails.length > 0 ? aircraftDetails.join('\n') : 'Not Set' },
                )
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