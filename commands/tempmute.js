const Discord = require("discord.js");
const ms = require("ms");
const footers = require('../data/footers.json');

exports.run = async (client, message, args) => {

    let tomute = message.mentions.users.first() || message.guild.members.get(args[0]);
    if(!tomute) return message.reply("Couldn't find this user!");
    if(message.author.id === message.mentions.users.first()) return message.reply("You can't mute yourself:facepalm:");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have the permission to do that:facepalm:");
    let muteRole = message.guild.roles.cache.find(`name`, "Muted");
    if (!muteRole) {
        try {
            muteRole = await message.guild.createRole({
                name:"Muted",
                color: "#00ff00",
                permissions:[]
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    MANAGE_MESSAGES: false,
                    READ_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }
    let mutetime = args[1];
    if(!mutetime) return message.reply("You didnt specify a time for temporary mute.");
    
    const embed = new Discord.MessageEmbed()
    .setColor(0x00FFFF)
    .setTimestamp()
    .addField('Action:', 'Temp Mute')
    .addField('User:', `${tomute.username}#${tomute.discriminator} (${tomute.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Length', ms(ms(mutetime)))
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed});

    message.guild.member(tomute).addRole(muteRole);

    setTimeout(function(){
        message.guild.member(tomute).removeRole(muteRole)
        message.channel.send(`<@${tomute.id}> has been unmuted`)
    }, ms(mutetime));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['softmute','tempm'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'tempmute',
    description: 'Temporary mute the mentioned user',
    usage: 'tempmute @user (time)'
  };
