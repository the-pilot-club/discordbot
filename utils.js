import Sentry from "@sentry/node"
import {
    boosterMessage,
    bumpWars,
    fno,
    inviteLink, joinVatsim,
    moderatorContent,
    msfsHelp,
    rulesContent,
    supportContent, thanksTpc,
    tpcCallsign,
    tpcLivery, tpcReaction, whatIsVatsimContent, whatServer,
    worldTour
} from "./events/messageCreate.js";
import {ferryRequest, joinCharters, trainingRequest} from "./events/interactionCreate.js";

export function sendToSentry(err, locationLabel) {
    Sentry.withScope(function (scope) {
        // group errors together based on their request and response
        scope.setFingerprint([locationLabel, err.toString()]);
        Sentry.captureException(err);
    });
}

export function handleMessageCreateEvent (message) {
    /**
     * @typedef {Object<string, () => void>} SearchCases
     */

    /**
     * @type SearchCases
     */

    const exactSearchCases = {
        'bump wars': () => bumpWars(message),
        'what is fno?': () => fno(message),
        'invite link': () => inviteLink(message),
        'invite link mrs bot': () => inviteLink(message),
        moderator: () => moderatorContent(message),
        'msfs2020 help': () => msfsHelp(message),
        rules: () => rulesContent(message),
        support: () => supportContent(message),
        'tpc callsign': () => tpcCallsign(message),
        'tpc livery': () => tpcLivery(message),
        'world tour': () => worldTour(message)
    }

    if (exactSearchCases[message.content.toLowerCase()] === undefined) {
        if (message.content.toLowerCase().includes('join vatsim')) {
            return joinVatsim(message)
        } else if (message.content.includes('what server')) {
            return whatServer(message)
        } else if (message.content.toLowerCase().includes('thanks tpc')) {
            return thanksTpc(message)
        } else if (message.content.toLowerCase().includes('what is vatsim?')) {
            return whatIsVatsimContent(message)
        }
    } else {
        return exactSearchCases[message.content.toLowerCase()]()
    }
    if (message.type === 8 || message.type === 9 ||message.type === 10 ||message.type === 11) {
        return boosterMessage(message)
    }

    if (message.channel.type !== 1) {
        if (message.channel.id === '830210202464813056' || (message.channel.name.startsWith('SCREENSHOT CONTEST') && message.channel.parentId === '830210202464813056')){
            return tpcReaction(message)
        }
    }



}

export async function handleInteractionCreateEvent (interaction) {
    switch (interaction.customId) {
        case 'charter-ferry' : return ferryRequest(interaction)
        case 'join-charters' : return joinCharters(interaction)
        case 'training-request' : return trainingRequest(interaction)
    }

    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) return

    try {
        return await command.execute(interaction)
    } catch (error) {
        console.error(error)
        sendToSentry(error, "Interaction Execute")
        return await interaction.reply({
            content: 'There was an error while executing this command! Please let Eric | ZSE | TPC76 know ASAP so that a fix can occur!' +
                '\n \nIf this is the booking or PIREP Command, please un-archive the channel as this is the reason you are getting this error',
            ephemeral: true
        }).catch(err => (sendToSentry(err, "Interaction Failure Message")))
    }
}