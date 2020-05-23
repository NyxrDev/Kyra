const musicfuncs = require('../handlers/music.js');
exports.run = async (bot, message, args, funcs) => {
    try {
        musicfuncs.radioStations(message);
    } catch (e) {
        console.log(e);
        funcs.send(`Oh no! An error occurred! \`${e.message}\`.`);
    }
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['rst'],
	permLevel: 0
};

exports.help = {
	name: 'radiostations',
	category: 'Miscelaneous',
	description: 'Radio realated commands!',
	usage: 'rst'
};
