const footers = require('../data/footers.json');
const Discord = require('discord.js');
const customisation = require('../customisation.json');

exports.run = async (client, message, args) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to aim at");
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username}`+" has readied their gun at "+`${message.mentions.users.first().username}`)
    .setImage("https://cdn.discordapp.com/attachments/641051155471925289/642524655063924797/unknown.png")
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

exports.help = {
    name: 'aim',
    description: 'aim at someone',
    usage: 'aim [user]'
  };

