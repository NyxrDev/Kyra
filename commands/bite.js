const { MessageEmbed } = require('discord.js');
exports.run = async (message, args) => {

const { MessageEmbed } = require("discord.js");
exports.run = async (bot, message, args, funcs) => {
    let whotto = message.mentions.members.first()
    if (!whotto) return message.channel.send(`Please mention somebody to bite!`);
    if (whotto.id == message.author.id)
      return message.channel.send(`Ummm.. I am not sure if you can bite yourself..`);
    let embed = new MessageEmbed()
      .setColor("PINK")
      .setImage("https://i.pinimg.com/originals/a4/30/3c/a4303c3a2939c8075832e05a91d9076c.gif")
      .setTitle(`${whotto.user.username}, ${message.author.username} has bitten you!`)
    message.channel.send(embed);
}
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bite',
  description: 'bite >:C',
  usage: 'bite [user]'
};
