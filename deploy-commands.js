const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('membercount').setDescription('Replies with current member count!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('metar').setDescription('gives metar for specific airport').addStringOption(option =>
        option.setName('airport')
        .setDescription('The input to echo back')
        .setRequired(true)),
	new SlashCommandBuilder().setName('atis').setDescription('gives atis for specific airport').addStringOption(option =>
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
                .setRequired(true))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);