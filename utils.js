import {ActionRow, ActionRowBuilder, ModalBuilder, TextInputBuilder} from "discord.js";

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