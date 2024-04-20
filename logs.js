import { EmbedBuilder } from 'discord.js';
import {Config} from "./config/config.js";
const config = Config
import {sendToSentry} from "./utils.js";

let logChannel;

export async function init(client) {
    try {
        logChannel = client.channels.cache.find(channel => channel.name === 'bot-dump-channel')
        if (!logChannel) {
            console.error(`Couldn't find the logging channel'`);
        }
    } catch (error) {
        console.error(`Error getting log channel: ${error}`);
    }
}
export async function guildBanAdd(ban) {
try {
      const embed = new EmbedBuilder()
      .setAuthor({ name: `${ban.user.username}`, iconURL: `${ban.user.displayAvatarURL()}` })
      .setTitle('Member banned')
      .setDescription(`<@${ban.user.id}>`)
      .setColor("#D76351")
      .setFooter({
        text: `ID: ${ban.user.id}`,
      })
      .setTimestamp();
          logChannel.send({embeds: [embed]})
  } catch (error) {
          sendToSentry(error, "Guild ban add log")
  }
}

export async function guildBanRemove(ban) {
try {
      const embed = new EmbedBuilder()
      .setAuthor({ name: `${ban.user.username}`, iconURL: `${ban.user.displayAvatarURL()}` })
      .setTitle('Member unbanned')
      .setDescription(`<@${ban.user.id}>`)
      .setColor("#6CDBFE")
      .setFooter({
        text: `ID: ${ban.user.id}`,
      })
      .setTimestamp();
    logChannel.send({embeds: [embed]})
  } catch (error) {
          sendToSentry(error, "Guild ban remove log")
  }
}

export async function guildMemberAdd(member) {
try {
      const embed = new EmbedBuilder()
      .setAuthor({ name: `${member.displayName}`, iconURL: `${member.displayAvatarURL()}` })
      .setTitle('Member joined')
      .setDescription(`<@${member.id}> ${member.guild.memberCount}th to join\nCreated <t:${Math.round(member.user.createdTimestamp / 1000)}:R>.`)
      .setColor("#5EDCB1")
      .setFooter({
        text: `ID: ${member.id}`,
      })
      .setTimestamp();
       logChannel.send({embeds: [embed]})
      await member.roles.add(member.guild.roles.cache.find(role => role.name === 'Pilots'))
  } catch (error) {
          sendToSentry(error, "Guild member add log")
  }
}


export async function guildMemberRemove(member) {
try {
  const formattedRoles = member.roles.cache
  .filter(role => role.id !== member.guild.id)
  .map(role => role.toString())
  .join(', ');

  const url = `${config.fcpBaseUrl()}/api/users/find/${member.id}/delete`;


  // const response = await fetch(url, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       'Authorization': `Bearer ${process.env.FCP_TOKEN}`
  //     },
  // });
  // if (response.status === 200) {
  //     const successEmbed = new EmbedBuilder()
  //     .setAuthor({ name: `${member.displayName}`, iconURL: `${member.displayAvatarURL()}` })
  //     .setTitle('Member left')
  //     .setDescription(`<@${member.id}> joined <t:${Math.round(member.joinedTimestamp / 1000)}:R>\n**Roles:** ${formattedRoles}\n\nThis user has been removed from FCP.`)
  //     .setColor("#FBF7B4")
  //     .setFooter({
  //       text: `ID: ${member.id}`,
  //     })
  //     .setTimestamp();
  //     logChannel.send({embeds: [successEmbed]})
  //
  //       } else if (response.status === 404) {
    const noFCPEmbed = new EmbedBuilder()
    .setAuthor({ name: `${member.displayName}`, iconURL: `${member.displayAvatarURL()}` })
    .setTitle('Member left')
    .setDescription(`<@${member.id}> joined <t:${Math.round(member.joinedTimestamp / 1000)}:R>\n**Roles:** ${formattedRoles}`)
    .setColor("#FBF7B4")
    .setFooter({
      text: `ID: ${member.id}`,
    })
    .setTimestamp();
      logChannel.send({embeds: [noFCPEmbed]})
            console.log(`User ${member.id} doesn't have an FCP account.`);
        // } else {
        //     console.error(`Error removing user from FCP. Status code: ${response.status}`);
        //     sendToSentry(error, "FCP Removal")
        // }
    } catch (error) {
            sendToSentry(error, "FCP Removal")
    }
}

export async function guildMemberUpdate(oldMember, newMember) {
  try {
      // if (oldMember.partial) {
      //     const embed = new EmbedBuilder()
      //         .setAuthor({name: `${newMember.user.username}`, iconURL: `${newMember.user.displayAvatarURL()}`})
      //         .setTitle('Log Error')
      //         .setDescription(`${newMember.user} has been updated, however due to Discord limitations, I cannot provide the full log.\nThe user either:\n- Had their nickname changed\n- Had a role added\n- Had a role removed.`)
      //         .setColor("#FF0000")
      //         .setFooter({
      //             text: `ID: ${newMember.user.id}`,
      //         })
      //         .setTimestamp();
      //     logChannel.send({embeds: [embed]});
      //     return;
      // }
      const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
      const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    if (oldMember.nickname !== newMember.nickname) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: `${newMember.user.username}`, iconURL: `${newMember.user.displayAvatarURL()}` })
        .setTitle('Name change')
        .setDescription(`**Before:** ${oldMember.nickname}\n**+After:** ${newMember.nickname}`)
        .setColor("#5A82EF")
        .setFooter({
          text: `ID: ${newMember.user.id}`,
        })
        .setTimestamp();
        logChannel.send({ embeds: [embed] });
    }

    if (addedRoles.size > 0) {
      const addedRoleMentions = addedRoles.map(role => role.toString()).join(', ');
      const embed = new EmbedBuilder()
        .setAuthor({ name: `${newMember.user.username}`, iconURL: `${newMember.user.displayAvatarURL()}` })
        .setTitle('Role Added')
        .setDescription(addedRoleMentions)
        .setColor("#5A82EF")
        .setFooter({
          text: `ID: ${newMember.user.id}`,
        })
        .setTimestamp();
        logChannel.send({ embeds: [embed] });
    }

    if (removedRoles.size > 0) {
      const removedRoleMentions = removedRoles.map(role => role.toString()).join(', ');
      const embed = new EmbedBuilder()
        .setAuthor({ name: `${newMember.user.username}`, iconURL: `${newMember.user.displayAvatarURL()}` })
        .setTitle('Role Removed')
        .setDescription(removedRoleMentions)
        .setColor("#FBF7B4")
        .setFooter({
          text: `ID: ${newMember.user.id}`,
        })
        .setTimestamp();
        logChannel.send({ embeds: [embed] });
    }
  } catch (error) {
    console.log(error);
    sendToSentry(error, "Guild member role update log");
  }
}
