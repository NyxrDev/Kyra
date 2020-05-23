 
const footers = require('../data/footers.json');
const Discord = require('discord.js');
const customisation = require('../customisation.json');

exports.run = async (client, message, args) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL : message.author.avatarURL;
    
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage(`https://api.alexflipnote.dev/amiajoke?image=` + avatar) 
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'amiajoke',
    description: 'Am I A Joke to You?',
    usage: 'amiajoke (w or w/o @mention)'
  };
   