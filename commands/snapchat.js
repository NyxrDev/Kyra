const snaps = require('../data/snaps.json');
 const footers = require('../data/footers.json');
const Discord = require('discord.js');

exports.run = (client, message) => {
    if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
    const embed = new Discord.MessageEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTimestamp()
    .setTitle("Here is a snapchat lewd")
    .setImage(`${snaps[Math.floor(Math.random() * snaps.length)]}`)
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['snap'],
  permLevel: 0
};

exports.help = {
  name: 'snapchat',
  description: 'snapchat images [nsfw]',
  usage: 'snapchat'
};
