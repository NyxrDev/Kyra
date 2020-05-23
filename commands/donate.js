const Discord = require("discord.js");

exports.run = async (client, message) =>{
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle("Got links?")
    .addField("Support Server", "[Join](https://discord.gg/jjgjV62)")
    .addField("PayPal", "https://www.paypal.me/Xyni")
    .addField("$2 USD", "A custom command that only you can use, as well as a rank in Support server")
    .addField("$5 USD", "^ + Two more commands for you and a friend to have made!")
    .addField("$8 USD", "^ + Added to our supporters list command and a custom role in support server")
    .addField("$10 USD", "^ + Access to all things bot related in Support server, Including Join/Leave Logs")
    .setTimestamp()
    .setFooter("Thanks for your support!")
    message.channel.send(embed);
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["don", "contribute", "fund"],
    permLevel: 0
};
exports.help = {
    name: 'donate',
    description: 'Shows our invites',
    usage: 'invite'
};
