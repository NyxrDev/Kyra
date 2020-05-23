const fuck = require('../data/germs.json');
const Discord = require('discord.js');
const footers = require('../data/footers.json');

exports.run = (client, message, args) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone!");
    args = args.join(" ");
    const embed = new Discord.MessageEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTimestamp()
    .setTitle(`${message.author.username} help cure ${message.mentions.users.first().username} of corona!`)
    .setImage(`${fuck[Math.floor(Math.random() * fuck.length)]}`)
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["quarentine", "cor"],
  permLevel: 0
};

exports.help = {
  name: 'corona',
  description: 'lol',
  usage: 'corona [user]'
};
