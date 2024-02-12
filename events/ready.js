import {config} from "dotenv";
config()
import {ActivityType, Routes} from "discord.js";
import {list} from "../commands/index.js";
import {REST} from "@discordjs/rest";

export function imReady(client) {
  const gitchannel = client.channels.cache.find(channel => channel.name === 'github-notifications')
  console.log(`Logged in as ${client.user.tag}`)
  client.user.setActivity('XPlane 11', { type: ActivityType.Playing })
  if (process.env.NODE_ENV === "prod"){
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
  }
  return gitchannel.send('https://tenor.com/view/hiding-under-covers-tired-sleepy-hiding-under-blanket-good-night-gif-19864771')
}
