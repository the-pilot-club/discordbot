module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "tpc livery")
      message.reply("Club liveries can be downloaded here: https://www.thepilotclub.org/sop#liveries")
      }
  };