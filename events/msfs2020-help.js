module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "msfs2020 help")
      message.reply(`check out MSFS2020 FAQ: https://discord.com/channels/830201397974663229/840905938969427999/851849675601346610`)
      }
  };