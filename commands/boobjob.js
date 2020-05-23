const boob = require('../data/boob.json');
const footers = require('../data/footers.json');
const Discord = require('discord.js');
const customisation = require('../data/customisation.json');

exports.run = (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to give a boobjob.");
    args = args.join(" ");
    const embed = new Discord.MessageEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTimestamp()
    .setTitle(`${message.author.username} gave ${message.mentions.users.first().username} a boobjob`)
    .setImage(`${boob[Math.floor(Math.random() * boob.length)]}`)
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
  name: 'boobjob',
  description: 'have a boobjob [nsfw]',
  usage: 'boobjob'
};
