 
const Discord = require('discord.js');
const superagent = require('superagent');
const footers = require('../data/footers.json');


exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to poke");
    if (message.mentions.users.first().id === "677135764626210856") return message.channel.send('Why did you poke me?!');
    const { body } = await superagent
//    .get("https://nekos.life/api/v2/img/poke");

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`OwO, ${message.author.username} poked ${message.mentions.users.first().username}`)
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
    name: 'poke',
    description: 'Pokes someone OwO',
    usage: 'poke'
  };
