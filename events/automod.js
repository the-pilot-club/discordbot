import {
    ChannelType,
} from 'discord.js';

export async function autoMod(action) {
    if (action.action.type === 2 || action.action.type === 3) {
        return;
    }
    let threadChannel;
    if (action.channel.type === 0) {
        threadChannel = action.channel;
    } else if (
        (action.channel.type === 11 && action.channel.parent.type === 0) ||
        (action.channel.type === 11 && action.channel.parent.type === 0)
    ) {
        threadChannel = action.channel.parent;
    } else {
        return;
    }
    const oldThread = threadChannel.threads.cache.find(
        (channel) => channel.name === `Private - ${action.member.displayName}`,
    );
    if (oldThread) {
        let message = `${action.user.toString()} You have sent something in The Pilot Club that is a part of our auto moderation. Here is the reason for the block:\n\n`;
        if (action.matchedKeyword !== null && action.matchedKeyword !== 'game') {
            message += `You send the word: \`\`${action.matchedKeyword}\`\`. This word will be blocked each time you send it.`;
        }
        if (action.matchedKeyword === 'game') {
            message += `You mentioned the word \`\`game\`\` in your message. At TPC, we are a flight simulation community and use the sim for maximum realism. Therefore, we prefer not using the word \`\`game\`\`. Thank you for understanding.`;
        }
        if (action.ruleTriggerType === 3) {
            message +=
                'The message you sent is seen to discord as spam. If you believe this to be in error, please reach out to a member of staff via the support channel.';
        }
        if (action.ruleTriggerType === 4) {
            message +=
                '\n\n The word you sent is also in discord list of pre-defined list of words that cannot be sent. This type of language is not allowed.';
        }
        if (action.ruleTriggerType === 5) {
            message +=
                'You attempted to send a message with multiple roles that you were mentioning. Please do not try this again.';
        }
        // @ts-expect-error: This is not shown properly within discord.js
        if (action.ruleTriggerType === 6) {
            message +=
                '\n\n Your profile is seen to us as an issue and thus we have blocked you from using it. Should you believe this to be in error, please reach out to a member of staff via the support channel.';
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
                if (action.matchedKeyword !== null && action.matchedKeyword !== 'game') {
                    message += `You send the word: \`\`${action.matchedKeyword}\`\`. This word will be blocked each time you send it.`;
                }
                if (action.matchedKeyword === 'game') {
                    message += `You mentioned the word \`\`game\`\` in your message. At TPC, we are a flight simulation community and use the sim for maximum realism. Therefore, we prefer not using the word \`\`game\`\`. Thank you for understanding.`;
                }
                if (action.ruleTriggerType === 3) {
                    message +=
                        'The message you sent is seen to discord as spam. If you believe this to be in error, please reach out to a member of staff via the support channel.';
                }
                if (action.ruleTriggerType === 4) {
                    message +=
                        '\n\n The word you sent is also in discord list of pre-defined list of words that cannot be sent. This type of language is not allowed.';
                }
                if (action.ruleTriggerType === 5) {
                    message +=
                        'You attempted to send a message with multiple roles that you were mentioning. Please do not try this again.';
                }
                // @ts-expect-error: This is not shown properly within discord.js
                if (action.ruleTriggerType === 6) {
                    message +=
                        '\n\n Your profile is seen to us as an issue and thus we have blocked you from using it. Should you believe this to be in error, please reach out to a member of staff via the support channel.';
                }
                thread.send(message);
                thread.setLocked(true);
            });
    }
}
