module.exports = {
  name: 'messageCreate',
  once: false,
  execute (message) {
    if (message.content.toLowerCase() === 'bump wars') {
      message.reply('**[BUMP WARS:](<https://discord.com/channels/830201397974663229/958549204073087086>)** \n \n' +
        '__Team 1: Hot Dogs__\n\n- <@130510720763822080>\n- <@715881255027081238>\n- <@796121185825062963>' +
        '\n\n__Team 2: Big Guns__\n\n- <@524567291128709140>\n- <@628118960637870090>\n- <@601567349669363722>' +
                ' \n \n__Rules:__ \n' +
                '1: type `/bump` to bump the server on Disboard \n' +
                '2: Bumps are only possible once every 2 hours \n' +
                '3: If your bump is successful you must post the current score under your bump or forfeit the point (nobody gets a point) \n' +
                '4: Have fun! \n' +
        '5: This war starts on 11/01 0400z (00:00 ET) and ends on 12/01 0359z (11/30 23:59 ET)\n' +
                '\nImportant info: \n' +
        "* If there are more than one bump at a time, only those claimed will be valid, no matter how many there are.\n" +
        "* The team with the most bumps under their belt at the end of the month wins!\n" +
        "* Winning team members get 1000 TPC points and a shout-out during next town-hall" +
                ' It gives our community a chance to grow and allows you to be involved in the process. Have fun!')
    }
  }
}
