const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const footers = require('../data/footers.json');
const customisation = require('../customisation.json');
const settings = require("../settings.json");
;
const fs = require('fs')

exports.run = (client, message, args) => {
  if (!message.author.id === settings.ownerid) return message.channel.send("These are for my Developer only >:(")
  message.delete()

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('owner', help.Owner)
  .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
  message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cmds_owner"],
    permLevel: 5
  };

exports.help = {
    name: 'owner',
    description: 'Displays all the available commands for your permission level.',
    usage: 'help [command]'
  };

