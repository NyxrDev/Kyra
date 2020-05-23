const Discord = require('discord.js')
const superagent = require("superagent");

exports.run = async (client, message, args, level) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL() : message.author.avatarURL();
    const { body } = await superagent
      .get(`https://nekobot.xyz/api/imagegen?type=iphonex&URL()=${avatar}`);
    const lewdembed = new Discord.MessageEmbed()
      .setTitle("IPhone X")
      .setColor(`RANDOM`)
      .setImage(body.message)
      .setFooter("IPhone X")
   message.channel.send(lewdembed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'iphonex',
  description: 'iphonex images [nsfw]',
  usage: 'iphonex [mention]'
};

