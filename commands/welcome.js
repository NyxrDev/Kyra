const footers = require('../data/footers.json');
const Discord = require('discord.js');
exports.run = async (client, message) => {
    message.delete();
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Welcome!")
    .addField(`Welcome to ${message.guild.name}`, "Please read the rules, stay a while and relax!")
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['welc'],
    permLevel: 0
  };

exports.help = {
    name: 'welcome',
    description: 'Use this to welcome a new user!',
    usage: 'welcome'
  };


