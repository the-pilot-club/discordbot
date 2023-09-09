import {Message, ActionRowBuilder, ModalBuilder, TextInputBuilder} from "discord.js";
import {
    bumpWarsContent,
} from './eventContent.js'

/** @typedef {Object} TextInputObject
 * @property {string} custom_id
 * @property {string} label
 * @property {TextInputStyle} style */

/** @function addComponentsToModal
 * @param {ModalBuilder} modal
 * @param {((APITextInputComponent & {     type?: ComponentType.TextInput }) | undefined)[]} textInputs
 * @returns void
 *
 * @description This function is a utility constructed to help with adding components to modals and reducing the repetitive code.
 * */

export function addComponentsToModal(modal, textInputs) {
    let rows
    for (const textInput of textInputs) {
        modal.addComponents(
            new ActionRowBuilder({
                    components: [
                        new TextInputBuilder(textInput)
                    ],
                },
            )
        )
    }
}

/**
 *
 * @param {Message} message
 */

export function handleMessageCreateEvent(message) {
    /**
     * @typedef {Object<string, () => void>} SearchCases
     */

    /**
     *
     * @type SearchCases
     */

    const exactSearchCases = {
        "bump wars": () => bumpWarsContent(message),
        "what is fno?": () => fnoContent(message),
        "invite link": () => inviteLinkContent(message),
        "invite link mrs bot":() => inviteLinkTwoContent(message),
        "moderator": () => moderatorContent(message),
        "msfs2020 help": () => msfs2020HelpContent(message),
        "rules":() => rulesContent(message) ,
        "support": () => supportContent(message),
        "tpc callsign": () => tpcCallsignContent(message),
        "tpc livery": () => tpcLiveryContent(message),
        "world tour": () => worldTourContent(message)
    }

    if (exactSearchCases[message.content.toLowerCase()] === undefined) {
        if (message.content.toLowerCase().includes('join vatsim')) {
            return joinVatsimContent(message);
        } else if (message.content.includes('what server')) {
            return whatServerContent(message);
        } else if (message.content.toLowerCase().includes('thanks tpc')) {
            return thanksTpcContent(message);
        } else if (message.content.toLowerCase().includes('what is vatsim?')) {
            return whatIsVatsimContent(message);
        } else {
            throw Error(`unsupported message content found: ${message.content}`);
        }
    } else {
        return exactSearchCases[message.content.toLowerCase()]()
    }
}

export function handleInteractionCreateEvent(interaction) {

}