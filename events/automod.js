import {
    ChannelType,
} from 'discord.js';
import { Config } from "../config/config.js";
const config = Config;
import { sendToSentry } from "../utils.js";

function getLogMessage(action) {
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
    return logMessage;
}

function getUserMessage(action) {
    let message = `${action.user.toString()} You have sent something in The Pilot Club that is a part of our auto moderation. Here is the reason for the block:\n\n`;
    if (action.matchedKeyword !== null && action.matchedKeyword !== 'game') {
        message += `You sent the word: \`\`${action.matchedKeyword}\`\`. This word will be blocked each time you send it.`;
    } else if (action.matchedKeyword === 'game') {
        message += `You mentioned the word \`\`game\`\` in your message. At TPC, we are a flight simulation community and use the sim for maximum realism. Therefore, we prefer not using the word \`\`game\`\`. Thank you for understanding.`;
    } else if (action.ruleTriggerType === 3) {
        message += 'The message you sent is seen by Discord as spam. If you believe this to be in error, please reach out to a member of staff via the support channel.';
    } else if (action.ruleTriggerType === 4) {
        message += '\n\nThe word you sent is in Discord\'s predefined list of words that cannot be sent. This type of language is not allowed.';
    } else if (action.ruleTriggerType === 5) {
        message += 'You attempted to send a message mentioning multiple roles. Please do not try this again.';
    } else if (action.ruleTriggerType === 6) {
        message += '\n\nYour profile is seen by us as an issue and thus we have blocked you from using it. Should you believe this to be in error, please reach out to a member of staff via the support channel.';
    } else {
        message += 'Unknown reason.';
    }
    return message;
}

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

    const logMessage = getLogMessage(action);

    let thread = threadChannel.threads.cache.find(
        (channel) => channel.name === `Private - ${action.member.displayName}`,
    );

    if (!thread) {
        thread = await threadChannel.threads.create({
            name: `Private - ${action.member.displayName}`,
            type: ChannelType.PrivateThread,
            reason: 'Auto Moderation Response',
        });
        await thread.members.add(action.user);
    }

    const message = getUserMessage(action);
    await thread.send(message);
    await thread.setLocked(true);

    // Return early if the matched keyword is 'game' to prevent posting the log. 'Game' isn't malicious so no need to log
    if (action.matchedKeyword === 'game') {
        return;
    }

    const url = `${config.fcpBaseUrl()}/api/users/audit-logs/new`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'User-Agent': 'TPCDiscordBot',
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${config.fcpToken()}`,
        },
        body: JSON.stringify({
            user_id: action.user.id,
            submitted_by: '968312697403871232',
            text: logMessage,
        }),
    });

    if (!response.ok) {
        const errorDetails = await response.text();
        sendToSentry(errorDetails, 'Automod Audit Log');
    }
}
