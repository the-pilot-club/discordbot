import {
    ChannelType,
} from 'discord.js';

export async function autoMod(action) {
    if (action.action.type === 2 || action.action.type === 3) {
        return;
    }
    const threadChannel = action.channel
    const oldThread = threadChannel.threads.cache.find(
        (channel) => channel.name === `Private - ${action.member.displayName}`,
    );
    if (oldThread) {
        let message = `${action.user.toString()} You have sent something in The Pilot Club that is a part of our auto moderation. Here is the reason for the block:\n\n`;
        if (action.matchedKeyword !== null) {
            message += `You send the word: \`\`${action.matchedKeyword}\`\`. This word will be blocked each time you send it.`;
        }
        if (action.ruleTriggerType === 3) {
            message +=
                'The message you sent is seen to discord as spam. If you believe this to be in error, please reach out to a member of staff via the support channel.';
        }
        if (action.ruleTriggerType === 4) {
            message +=
                '\n\n The word you sent is also in discord list of pre-defined list of words that cannot be sent. This type of language is not allowed.';
        }
        await oldThread.send(message);
        await oldThread.setLocked(true);
    } else {
        await threadChannel.threads
            .create({
                name: `Private - ${action.member.displayName}`,
                type: ChannelType.PrivateThread,
                reason: 'Auto Moderation Response',
            })
            .then((thread) => {
                thread.members.add(action.user);
                let message = `${action.user.toString()} You have sent something in The Pilot Club that is a part of our auto moderation. Here is the reason for the block:\n\n`;
                if (action.matchedKeyword !== null) {
                    message += `You send the word: \`\`${action.matchedKeyword}\`\`. This word will be blocked each time you send it.`;
                }
                if (action.ruleTriggerType === 3) {
                    message +=
                        'The message you sent is seen to discord as spam. If you believe this to be in error, please reach out to a member of staff via the support channel.';
                }
                if (action.ruleTriggerType === 4) {
                    message +=
                        '\n\n The word you sent is also in discord list of pre-defined list of words that cannot be sent. This type of language is not allowed.';
                }
                thread.send(message);
                thread.setLocked(true);
            });
    }
}
