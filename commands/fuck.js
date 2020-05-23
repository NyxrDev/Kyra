const fuck = require('../data/fuck.json');
const Discord = require('discord.js');
const footers = require('../data/footers.json');

exports.run = (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to fuck.");
    args = args.join(" ");
    const embed = new Discord.MessageEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTimestamp()
    .setTitle(`${message.mentions.users.first().username} is fucked hard by ${message.author.username}`)
    .setImage(`${fuck[Math.floor(Math.random() * fuck.length)]}`)
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bang", "fucc"],
  permLevel: 0
};

exports.help = {
  name: 'fuck',
  description: 'fuck a user[nsfw]',
  usage: 'fuck [user]'
};
