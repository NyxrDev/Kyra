
const Discord = require('discord.js');
const superagent = require('superagent');
const footers = require('../data/footers.json');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to tickle them");
    if(message.mentions.users.first().id === "523579776749928449") return message.reply('You can\'t tickle him you. He will explode on impact XD.');
    const { body } = await superagent
//    .get("https://nekos.life/api/v2/img/tickle");

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`OwO, ${message.author.username} tickled ${message.mentions.users.first().username}`)
  //  .setImage(body.url) 
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
    name: 'tickle',
    description: 'Tickles someone OwO',
    usage: 'tickle'
  };
