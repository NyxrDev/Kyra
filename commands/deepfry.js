const Discord = require('discord.js')
const superagent = require("superagent");

exports.run = async (client, message, args, level) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL() : message.author.avatarURL();

    const { body } = await superagent
      .get(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${avatar}`);
    const lewdembed = new Discord.MessageEmbed()
      .setTitle("FRIED!")
      .setColor(`RANDOM`)
      .setImage(body.message)
      .setFooter("deepfried")
   message.channel.send(lewdembed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'deepfry',
  description: 'deepfry images [nsfw]',
  usage: 'deepfry'
};

