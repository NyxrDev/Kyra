const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const footers = require('../data/footers.json');
const customisation = require('../customisation.json');
;
const fs = require('fs')

exports.run = (client, message, args) => {
  message.delete();
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('Action', help.action)
  .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
  message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cmds_act"],
    permLevel: 5
  };
exports.help = {
    name: 'cmds_action',
    description: 'Displays all the available commands for your permission level.',
    usage: 'help [command]'
  };

