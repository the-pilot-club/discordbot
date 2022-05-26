module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "join vatsim")
      message.reply(" To Join VATSIM you should go to this website: https://my.vatsim.net/ and click register!")
      }
  };