const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const footers = require('../data/footers.json');
;
const fs = require('fs')

exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('Ａｓｍｏｄｅｕｓ', help.partners)
  .addField('Bot Listing:','[here](http://cosmina.xyz/bot/640827656660582400)')
  .addField('Bot invite:','[here](https://discordapp.com/oauth2/authorize?client_id=640827656660582400&scope=bot&permissions=2097151191)')
  .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
  message.channel.send({embed}) 
    };

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["part"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'partners',
    description: 'Displays all the current partners.',
    usage: 'partners'
  };

