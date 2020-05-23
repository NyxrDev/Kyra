const childProcess = require('child_process');
exports.run = (client, message, args, data, errors) => {
  if (message.author.id !== "523579776749928449") return message.channel.send('You baka, what made you think you\'d be able to use this?!');
    childProcess.exec(args.join(' '), {},
        (err, stdout, stderr) => {
            if (err) return message.channel.sendCode('', err.message);
            message.channel.sendCode('', stdout);
        });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'exec',
  description: 'Executes a process command.',
  usage: 'exec'
};
