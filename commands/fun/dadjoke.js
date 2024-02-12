import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('dad-joke')
    .setDescription('Tells you a dad joke!'),
  async execute (interaction) {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'text/plain'
      }
    })
    const body = await response.text()
    if (body !== undefined && body !== '') {
      interaction.reply(`${body}`)
    } else {
      interaction.reply('I could not get a dad joke for you :( ')
    }
    ;
  }
}
