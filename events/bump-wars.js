module.exports = {
  name: 'messageCreate',
  once: false,
  execute (message) {
    if (message.content.toLowerCase() === 'bump wars') {
      message.reply('**[BUMP WARS](https://discord.com/channels/830201397974663229/958549204073087086)** \n \n' +
                '__Team 1: Law and Order__\n\n- Dylan | TPC1496 | DELA\n- Serge | TPC6\n- Kelvin | TPC1992 | SBxx' +
                '\n\n__Team 2: Angry Monkeys__\n\n- Caleb Y | TPC452 | 787\n- Rich P | N7RP\n- Chris | TPC139 | KUHC' +
                ' \n \n__Rules:__ \n' +
                '1: type `/bump` to bump the server on Disboard \n' +
                '2: Bumps are only possible once every 2 hours \n' +
                '3: If your bump is successful you must post the current score under your bump or forfeit the point (nobody gets a point) \n' +
                '4: Have fun! \n' +
                '\nImportant info: \n' +
                "*Daily score resets at midnight Eastern time. Any bumps made past that moment will be counted for the next day's score." +
                '\n*Teams compete to win the week by majority of days won. \n*The team with the most weeks under their belt at the end of the month wins! \n' +
                '\nWhy are we doing this? \nBumping this server often helps to keep us at the top of the server list on Disboard.' +
                ' It gives our community a chance to grow and allows you to be involved in the process. Have fun!')
    }
  }
}
