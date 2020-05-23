 
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const footers = require('../data/footers.json');

exports.run = (client, message, args) => {
    randomPuppy('awwnime')
    .then(url => {
        const embed = new Discord.MessageEmbed()
        .setImage(url)
        .setColor("RANDOM")
        .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
        return message.channel.send({ embed });
   })
   }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
    };
     
exports.help = {
  name: 'moe',
  description: 'Sends a random awwnime image',
  usage: 'moe'
};