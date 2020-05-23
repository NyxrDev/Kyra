const musicfuncs = require('../handlers/music.js');
exports.run = async (bot, message, args, funcs) => {
    try {
        musicfuncs.radio(message, args, funcs);
    } catch (e) {
        console.log(e);
        message.channel.send(`Oh no! An error occurred! \`${e.message}\`.`);
    }
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['pr','rad'],
	permLevel: 0
};

exports.help = {
	name: 'radio',
	category: 'Miscelaneous',
	description: 'Radio realated commands!',
	usage: 'str'
};
