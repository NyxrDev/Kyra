const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const footers = require('../data/footers.json');
;
const fs = require('fs')

exports.run = (client, message, args) => {
  message.delete();
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('Misc Commands', help.helpMsg3)
  .addField('Misc Commands', help.misc2)
  .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
  message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'cmds_misc',
    description: 'Displays all the available commands for your permission level.',
    usage: 'cmds_misc'
};

