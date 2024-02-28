import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('training-faq')
    .setDescription('Replies with information about training!'),
  async execute (interaction) {
    await interaction.reply({
      content: '**What is the TPC Flight School?**  - TPC Flight School is an online flight training program designed to help you master your skills as a virtual pilot, and authorized to award VATSIM P ratings to students who complete our courses and pass their checkride.\n' +
                '\n' +
                '**Where do I find it?** - https://flightschool.thepilotclub.org.\n' +
                '\n' +
                '**How do I enroll in a course?** - To sign into the Flight School, press the blue button on the top right of the site, click "VATSIM Connect" provide your CID and password. Once logged in, select the course you are training for, press "self enroll" if a course you select is higher then PPL, instructor enrollment is required.'
    })
  }
}
