 
const Discord = require('discord.js');
const footers = require('../data/footers.json');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to feed them.");
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/feed");
    
    const embed = new Discord.MessageEmbed()
  //  .setColor("RANDOM")
    .setTitle(`OwO, ${message.mentions.users.first().username}, you got fed by ${message.author.username}`)
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
    name: 'feed',
    description: 'Feeds someone OwO',
    usage: 'feed'
  };
