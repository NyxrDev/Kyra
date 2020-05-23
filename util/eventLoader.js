const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('reconnecting', () => reqEvent('reconnecting')(client));
  client.on('disconnect', () => reqEvent('disconnect')(client));
  client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  client.on('message', reqEvent('message'));
  client.on('messageDelete', reqEvent('messageDel'));
  client.on('guildMemberUpdate', reqEvent('memberUpdate'));
  client.on('messageUpdate', reqEvent('messageUpdate'));

};
