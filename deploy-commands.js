import {Config} from "./config/config.js";
const config = new Config()
import {REST} from '@discordjs/rest';
import {Routes} from 'discord.js';
import {list} from "./commands/index.js";


const commands = []


for (const command of list) {
    for (const cmds of command){
        commands.push(cmds.data)
    }
}

const rest = new REST({version: '10'}).setToken(config.token())

rest.put(Routes.applicationCommands(config.clientId()),
    {body: commands})
    .then(() => console.log('Successfully registered global commands.'))
    .catch(console.error)
