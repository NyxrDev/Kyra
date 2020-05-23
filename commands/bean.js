const Discord = require("discord.js");
const customisation = require('../customisation.json');
const footers = require('../data/footers.json');

exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first();
    let reason = args.slice(1).join(' ');
    if(message.author.id !== '523579776749928449') return message.reply("You don't have permission to do this!");
    if (!message.mentions.users.first()) return message.reply("Mention Someone to `bean`");
    if(!args[1]) return message.reply("Please specify a user and reason!");
    const embed = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('Action:', 'Bean')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed})

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["beans"],
    permLevel: 0
};
  
exports.help = {
    name: 'bean',
    description: 'bean a user!',
    usage: 'bean'
};
  