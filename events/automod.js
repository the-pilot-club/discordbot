import {
    ChannelType,
} from 'discord.js';
import {Config} from "../config/config.js";
const config = Config
import {sendToSentry} from "../utils.js";

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

    let logMessage = `Member triggered auto moderation within the discord server. Reason: `;
    if (action.matchedKeyword !== null && action.matchedKeyword !== 'game') {
        logMessage += `Sent blocked word "${action.matchedKeyword}".`;
    } else if (action.ruleTriggerType === 3) {
        logMessage += 'Message flagged as spam.';
    } else if (action.ruleTriggerType === 4) {
        logMessage += 'Used a word from Discord\'s predefined blocked words list.';
    } else if (action.ruleTriggerType === 5) {
        logMessage += 'Attempted to mention multiple roles.';
    } else if (action.ruleTriggerType === 6) {
        logMessage += 'Profile flagged as an issue.';
    } else {
        logMessage += 'Unknown reason.';
    }

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

    if (action.matchedKeyword === 'game') {
        return;
    }

    const url = `${config.fcpBaseUrl()}/api/users/find/${action.user.id}/audit-logs/new`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.FCP_TOKEN}`,
        },
        body: JSON.stringify({
            'user_id': action.user.id,
            'submitted_by': '968312697403871232',
            'text': logMessage,
        }),
    });
    if (!response.ok) {
        const errorDetails = await response.text();
        sendToSentry(errorDetails, "Automod Audit Log")
    }
}