const Discord = require('discord.js')
const footers = require('../data/footers.json');
const help = require('../data/helpMsgs.json');
const customisation = require('../customisation.json');
;
const fs = require('fs')

exports.run = (client, message) => {
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('Custom Commands', help.customcoms)
  .setFooter(`Want your own custom command? "}donate"`);
  message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cmds_cust", "cmds_cus"],
    permLevel: 0
  };
exports.help = {
    name: 'cmds_custom',
    description: 'Displays all the available custom commands',
    usage: 'customcom'
  };
