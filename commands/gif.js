const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
    if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
    superagent.get('https://nekos.life/api/v2/img/Random_hentai_gif')
        .end((err, response) => {
      const lewdembed = new Discord.MessageEmbed()
      .setTitle("Hentai")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`Tags: gif`)
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
  name: 'gif',
  description: 'gif images [nsfw]',
  usage: 'gif'
};

