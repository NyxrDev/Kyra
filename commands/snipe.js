const Discord = require('discord.js')
exports.run = (client, message, args, config) => {

    String.prototype.embedify = function() {
        return new Discord.MessageEmbed().setColor("RANDOM").setDescription(this)
    }

    let snipe = client.snipe.get(message.guild.id)

    if(!snipe) return message.channel.send('Could not find a message that was deleted.')

    if(args[0] == 'image') {
        if(!args[1]) return message.channel.send('Please provide a message to retrieve the image from!')
        let image = snipe[args[1] - 1]
        if(!image[1]) return message.channel.send('That message does not have an attached (deleted) image!')
        console.log(image[1])
        return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setImage(image[1]))
    }
    const x = `snipe.map(msg =>`;
    let counter = 0;
        return message.channel.send(`${snipe.map(msg => ` ${msg[0].content ? `${msg[0].content}${!msg[1] ? '' : '\n[IMAGE WAS DELETED]'}` : (!msg[1] ? '' : '[IMAGE WAS DELETED]')}\n**Author -** <@${msg[0].author.id}>`).join('\n\n')}`.embedify().setThumbnail(client.user.avatarURL()).setFooter(`Sniped by: ${message.author.tag}`));
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    aliases: ["ss"]
};
exports.help = {
    name:"snipe",
    usage:"snipe",
    desc:"Snipes the last deleted message in the server."
};
