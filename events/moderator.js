module.exports = {
  name: 'messageCreate',
  once: false,
  execute (message) {
    if (message.content.toLowerCase() === 'moderator') { message.reply(' A <@&849037973064384514> has been notified!') }
  }
}
