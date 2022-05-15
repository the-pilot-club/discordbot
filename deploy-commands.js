const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('membercount').setDescription('Replies with current member count!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
        new SlashCommandBuilder().setName('leaderboard').setDescription('The link to find our leaderbaord!'),
        new SlashCommandBuilder().setName('next-flight').setDescription('The link to find our out our next flight!'),
        new SlashCommandBuilder().setName('server-commands').setDescription('The link to get a list of server commands!'),
    new SlashCommandBuilder().setName('metar').setDescription('gives metar for specific airport').addStringOption(option =>
        option.setName('airport')
        .setDescription('The input to echo back')
        .setRequired(true)),
	new SlashCommandBuilder().setName('airport').setDescription('gives information about specific airport').addStringOption(option =>
        option.setName('airport')
        .setDescription('The input to echo back')
        .setRequired(true)),
        new SlashCommandBuilder().setName('charts').setDescription('gives information about specific airport').addStringOption(option =>
                option.setName('airport')
                .setDescription('The input to echo back')
                .setRequired(true)),
        new SlashCommandBuilder().setName('poll').setDescription('create a poll').addStringOption(option =>
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
                                        .setRequired(true))
]
	.map(command => command.toJSON());
const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);