const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
    superagent.get('https://weebs4life.ga/api/neko')
        .end((err, response) => {
      const lewdembed = new Discord.MessageEmbed()
      .setTitle("Neko")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`Tags: neko`)
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
  name: 'neko',
  description: 'neko images [nsfw]',
  usage: 'neko'
};

