const fuck = require('../data/fuck.json');
const Discord = require('discord.js');
const footers = require('../data/footers.json');

exports.run = (client, message, args) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to bonk");
    args = args.join(" ");
    const embed = new Discord.MessageEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTimestamp()
    .setTitle(`***Bonks ${message.mentions.users.first().username}***  "No horny for you!"`)
    .setDescription(`<:1bonk:704194481536368693><:2bonk:704194494119280652>`)
    message.channel.send({embed})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bonk',
  description: 'bonk a user[nsfw]',
  usage: 'bonk [user]'
};
