import Sentry from "@sentry/node"
import {
    bumpWars,
    fno,
    inviteLink, joinVatsim,
    moderatorContent,
    msfsHelp,
    rulesContent,
    supportContent, thanksTpc,
    tpcCallsign,
    tpcLivery, whatIsVatsimContent, whatServer,
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
}

export function handleInteractionCreateEvent (interaction) {
    switch (interaction.customId) {
        case 'charter-ferry' : return ferryRequest(interaction)
        case 'join-charters' : return joinCharters(interaction)
        case 'trainging-request' : return trainingRequest(interaction)
    }
}