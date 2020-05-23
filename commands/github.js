const footers = require('../data/footers.json');
const Discord = require('discord.js');

exports.run = async (client, message) => {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username}, Here's the Git repo:`)
    .setDescription("[Xynnix - Lynii on Github](https://github.com/Xynnix/Lynii/)")
    .setImage("https://avatars0.githubusercontent.com/u/53287573?s=400&v=4")
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
    name: 'github',
    description: 'Shows a link to the github repo',
    usage: 'githib'
  };
