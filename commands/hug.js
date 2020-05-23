 
const Discord = require('discord.js');
const superagent = require('superagent');
const footers = require('../data/footers.json');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to hug them");
    const { body } = await superagent
    .get("https://weebs4life.ga/api/hug");

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`OwO, ${message.author.username} hugged ${message.mentions.users.first().username}`)
    .setImage(body.url)
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["hugg"],
    permLevel: 0
  };
exports.help = {
    name: 'hug',
    description: 'Hugs someone OwO',
    usage: 'hug'
  };
