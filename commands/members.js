exports.run = (client, message) => {
    message.delete();
    const embed = new Discord.MessageEmbed()
    .setTitle("Guild Stats")
    .setColor(`RANDOM`)
    .setImage(message.guild.iconURL)
    .addField(`Server Name`, `${message.guild.name}`)
    .addField("Member Count", `${message.guild.members.size}`)
    .addField("Bot Count", `${message.guild.members.filter(m => m.user.bot).size}`)
    message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["mc"],
    permLevel: 0
};

exports.help = {
    name: "members",
    description: "Shows member info",
    usage: "members"
};
