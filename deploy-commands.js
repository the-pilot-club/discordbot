import {config} from "dotenv";
config()
import {REST} from '@discordjs/rest';
import {Routes} from 'discord.js';
import {list} from "./commands/index.js";


const commands = []


for (const command of list) {
    for (const cmds of command){
        commands.push(cmds.data)
    }
}

const rest = new REST({version: '10'}).setToken(process.env.BOT_TOKEN)

rest.put(Routes.applicationCommands(process.env.CLIENT_ID),
    {body: commands})
    .then(() => console.log('Successfully registered global commands.'))
    .catch(console.error)
