module.exports = {
    name: 'messageCreate',
    once: false,
    execute (message) {
  if (message.thread?.name.startsWith('SCREENSHOT CONTEST') || message.channel.id === '830210202464813056') {
    const image = message.attachments.find(attachment => attachment.contentType?.startsWith('image/'));
    if (image) {
      await message.react(':tpc:845075689241051138');
    }
      }
    }
  }