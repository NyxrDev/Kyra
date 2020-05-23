const { MessageEmbed } = require("discord.js");
exports.run = async (bot, message, args, funcs) => {
  try {
    let whotto = message.mentions.members.first();
    if (!whotto) return message.channel.send(`Please mention somebody to wave at!`);
    if (whotto.id == message.author.id)
      return message.channel.send(`Ummm.. I am not sure if you can wave at yourself..`);
    let embed = new MessageEmbed()
      .setImage("https://media.tenor.com/images/73ce6a152fdf3fa2645f6153c646c9b7/tenor.gif")
      .setTitle(`${whotto.user.username}, ${message.author.username} waved at you!`)
      .setColor("PINK");
    message.channel.send(embed);
  } catch (err) {
    console.log(err) 
    return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'wave',
  description: 'wave at someone >///<',
  usage: 'wave [user]'
};
