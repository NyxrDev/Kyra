const footers = require('../data/footers.json');
const Discord = require('discord.js');
exports.run = async (client, message) => {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username}`+" has lit a Padron <:Padron:633336283695022117>")
    .setImage("https://cdn.thegentlemansjournal.com/wp-content/uploads/2016/04/Al-Pacino-smoking-cigar-900x600-c-center.jpg")
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
    name: 'smoke',
    description: 'Light up a Padron',
    usage: 'smoke'
  };