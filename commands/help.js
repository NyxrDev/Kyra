const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const customisation = require('../customisation.json');
const settings = require('../settings.json');
const fs = require('fs')
exports.run = (client, message, args) => {
      const embed = new Discord.MessageEmbed()
      .setColor(Math.floor(Math.random()*16777215))
      .setTitle("Command list:", '')
      .addField("Moderation:", "`cmds_mod`", true)
      .addField("Utility:", "`cmds_util`", true)
      .addField("Misc", "`cmds_misc`", true)
      .addField("Action:", "`cmds_act`", true)
      .addField("Economy", "`cmds_eco`", true)
      .addField("NSFW", "`cmds_nsfw`", true)
      .addField("Owner Only", "`cmds_owner`", true)
      .setFooter("All commands start with k/")
      .setTimestamp()
	message.channel.send({embed});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};

