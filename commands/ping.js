exports.run = (client, message) => {
  message.channel.send('Ping?').then(m => m.edit(`Roundtrip took: ${m.createdTimestamp - message.createdTimestamp}ms. Heartbeat: ${Math.round(client.ws.ping)}ms.`))
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pong"],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'ping'
};
