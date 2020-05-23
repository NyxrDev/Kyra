const Discord = require('discord.js')
const footers = require('../data/footers.json');
const help = require('../data/helpMsgs.json');
;
const fs = require('fs')

exports.run = (client, message, args) => {
  message.delete();
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('Utility Commands', help.helpMsg2)
  .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
  message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cmds_util", "cmds_utils"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'cmds_utilities',
    description: 'Displays all the available commands for your permission level.',
    usage: 'help [command]'
  };

