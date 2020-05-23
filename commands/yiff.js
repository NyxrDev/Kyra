const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
    if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
    superagent.get('http://sheri.bot/api/yiff')
        .end((err, response) => {
      const lewdembed = new Discord.MessageEmbed()
      .setTitle("yiff")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`Tags: creampie`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    })
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yiff',
  description: 'yiff nsfw',
  usage: 'yiff'
};
