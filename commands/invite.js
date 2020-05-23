const Discord = require("discord.js");

exports.run = async (client, message) =>{
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle("Got links?")
    .addField("Support Server", "[Join](https://discord.gg/jjgjV62)")
    .addField("Invite me", "[Invite](https://discordapp.com/api/oauth2/authorize?client_id=626771394063237138&permissions=2147483127&scope=bot)")
    .setTimestamp()
    .setFooter("Thanks for your support!")
    message.channel.send(embed);
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["support"],
    permLevel: 0
};
exports.help = {
    name: 'invite',
    description: 'Shows our invites',
    usage: 'invite'
};
