module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "charts")
      message.reply("Here are some resources for free charts: ChartFox: https://chartfox.org/ SkyVector: https://skyvector.com/ LittleNavMap: https://albar965.github.io/")
      }
  };