const footers = require('../data/footers.json');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const customisation = require('../customisation.json');

exports.run = (client, message, args) => {
    randomPuppy('animemes')
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
    aliases: ['amemes'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'animemes',
    description: 'Sends a random post from r/animemes',
    usage: 'animemes'
  };