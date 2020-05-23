 
const footers = require('../data/footers.json');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to dethirst them");
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username}`+" has De-thirsted "+`${message.mentions.users.first().username}`+" cos they were too thirsty.")
    .setImage("https://cdn.discordapp.com/attachments/638715380239433729/642363952096870401/thristy.gif")
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
    name: 'dethirst',
    description: 'dethirst someone',
    usage: 'dethirst [user]'
  };

