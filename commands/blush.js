const blush = require('../data/blush.json');
const footers = require('../data/footers.json');
const Discord = require('discord.js');
const customisation = require('../customisation.json');

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTimestamp()
    .setTitle(`${message.author.username} has blushed! Awww..`)
    .setImage(`${blush[Math.floor(Math.random() * blush.length)]}`)
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'blush',
  description: 'Blush >///<',
  usage: 'blush'
};
