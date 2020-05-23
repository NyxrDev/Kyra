 
const Discord = require('discord.js');
const footers = require('../data/footers.json');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.channel.send("You must mention someone to throw away!");
    const avatar = message.mentions.users.first().avatarURL();
    const author = message.author.avatarURL();
    const out = `https://api.alexflipnote.dev/trash?face=${author}&trash=${avatar}`
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage(out)
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
    name: 'trash',
    description: 'trash someone OwO',
    usage: 'trash'
  };
