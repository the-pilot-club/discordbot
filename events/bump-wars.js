module.exports = {
  name: 'messageCreate',
  once: false,
  execute (message) {
    if (message.content.toLowerCase() === 'bump wars') {
      message.reply('**[BUMP WARS:](<discord://-/channels/830201397974663229/958549204073087086>)** \n \n' +
                '__Team 1: Hot Dogs__\n\n- Dylan | TPC1496 | DELA\n- Rich P | N7RP\n- Chris | TPC139 | ZNY' +
                '\n\n__Team 2: Big Guns__\n\n- Serge | TPC6\n- Caleb Y | TPC452\n- Kelvin | TPC1992 | SBxx' +
                ' \n \n__Rules:__ \n' +
                '1: type `/bump` to bump the server on Disboard \n' +
                '2: Bumps are only possible once every 2 hours \n' +
                "3: If your bump is successful you must post the current score under your bump. Others can forfeit the point (nobody gets a point) if you don't post it until next bump. \n" +
                '4: Have fun! \n' +
                '5: This war starts on 11/02 0400z (00:00 ET) and ends on 12/01 0359z (11/30 23:59 ET) \n' + 
                '\nImportant info: \n' +
                '*If there are more than one bump at a time, only those claimed will be valid, no matter how many there are. \n' +
                '*The team with the most bumps under their belt at the end of the month wins! \n' +
                '*Winning team members get 1000 TPC points and a shout-out during next town-hall \n' +
                '\nWhy are we doing this? \nBumping this server often helps to keep us at the top of the server list on Disboard.' +
                ' It gives our community a chance to grow and allows you to be involved in the process. Have fun!')
    }
  }
}
