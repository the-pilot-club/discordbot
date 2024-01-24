module.exports = {
    name: 'messageCreate',
    once: false,
    execute (message) {
      try {
        if (message.channel.id === '830210202464813056' || (message.channel.name.startsWith('SCREENSHOT CONTEST') && message.channel.parentId === '830210202464813056')) {
          const image = message.attachments.find(attachment => attachment.contentType?.startsWith('image/'));
          if (image) {
            message.react(':tpc:845075689241051138').catch(err => console.error(err));
          }
        }
      } catch (error) {
         console.error(JSON.parse(`{Channel: ${JSON.stringify(message.channel)}, User: ${JSON.stringify(message.user)}, Error: ${error}, Time: ${Date.now()}}`));
        }
    }
  }