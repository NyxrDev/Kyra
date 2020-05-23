const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message) => {
    superagent.get('https://nekos.life/api/v2/img/lizard')
        .end((err, response) => {
      const lewdembed = new Discord.MessageEmbed()
      .setTitle("Lizard")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`Tags: lizard`)
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
  name: 'lizard',
  description: 'shows lizard NSFW',
  usage: 'lizard'
};
