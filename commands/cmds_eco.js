const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const footers = require('../data/footers.json');
;
const fs = require('fs')

exports.run = (client, message, args) => {
  message.delete();
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('Economy', help.eco)
  .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
  message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cmds_economy"],
    permLevel: 0
  };

  exports.help = {
    name: 'cmds_eco',
    description: 'Displays all the available eco commands for your permission level.',
    usage: 'cmds_eco'
  };
