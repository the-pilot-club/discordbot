module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "help")
      message.reply("Fear not! Help is on the way! Also, check <#840905938969427999>.")
      }
  };