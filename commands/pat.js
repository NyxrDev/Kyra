const Discord = require('discord.js');
const superagent = require('superagent');
const footers = require('../data/footers.json');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to pat them");
    if (message.mentions.users.first().id === "677135764626210856") return message.channel.send(' ');
    const { body } = await superagent
//    .get("https://nekos.life/api/pat");
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`OwO, ${message.author.username} patted ${message.mentions.users.first().username}`)
//    .setImage(body.url) 
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
    name: 'pat',
    description: 'Pats someone OwO',
    usage: 'pat'
  };
