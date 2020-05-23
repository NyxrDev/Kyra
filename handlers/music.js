/*jshint -W018 */
const {
    RichEmbed
} = require("discord.js");
const yt = require('ytdl-core');
const ytdlDiscord = require('ytdl-core-discord');
const request = require('node-superfetch');
const stations = require("../data/radiostations.json");

let dispatcher;
let dispatcher_radio;
let queue = {};
let count = 0;
const voteSkipUsers = new Set();

module.exports = {
    play: async (message, args, funcs) => {
        if (!message.guild.me.hasPermission("CONNECT")) return message.channel.send(`I need the CONNECT permission to execute this command...`);
        if (!message.guild.me.hasPermission("SPEAK")) return message.channel.send(`I need the SPEAK permission to execute this command...`);
        if (dispatcher_radio != null) return message.channel.send('Please stop the radio before playing other music.');
        let query = args.join(' ');
        if (query < 1) return message.channel.send('You must include a query for what you want to play, add [songname/url]');
        let send1 = [];
        if (!queue[message.guild.id] === undefined && !queue[message.guild.id] === {}) {
            queue[message.guild.id].songs.forEach((i) => {
                send1.push(`${i + 1}`);
            });
            if (send1.length >= 10) return message.channel.send('Can\'t have more than 10 songs in the queue at one time');
        }
        const msg = await message.channel.send("Searching...");
        handleVideo(message, msg, query, funcs);
    },
    queue: (message, funcs) => {
        if (queue[message.guild.id] === undefined || queue[message.guild.id] == {}) return message.channel.send(`The queue is empty, no songs to display!`);
        let send1 = [];
        queue[message.guild.id].songs.forEach((song, i) => {
            send1.push(`\n${i + 1}. ${song.title}, requested by ${song.requestedBy}`);
        });
        message.channel.send(`**__${message.guild.name}'s Music Queue:__** Currently ${send1.length} queued.\n\`\`\`Songs Queued:\n${send1}\`\`\``);
    },
    clearqueue: (message, funcs) => {
        if (queue[message.guild.id] === []) return message.channel.send('Queue is empty, there are no songs to remove.');
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t find your voice channel...');
        queue[message.guild.id].songs = [];
        message.channel.send('Queue has been cleared!');
        voiceChannel.leave();
    },
    leave: async (message, bot, funcs) => {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t leave your voice channel...');
        const GuildCheck = bot.guilds.get(message.guild.id);
        if (!queue) return message.channel.send('There is nothing playing that I could stop for you.');
        if (GuildCheck.voiceConnection) {
            try {
                if (queue[message.guild.id] === undefined || queue[message.guild.id] === {}) {
                    voiceChannel.leave();
                } else {
                    queue[message.guild.id].songs = [];
                    const song = 'leave'
                    dispatcher.end(song)
                }
            } catch (err) {
                return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
            }
        } else {
            return message.channel.send('Make sure the bot is in a voice channel to leave.');
        }
    },
    skip: async (message, bot, funcs) => {
        const channel = message.member.voiceChannel;
        if (!channel || channel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel to skip the song...');
        if (queue[message.guild.id] === undefined || queue[message.guild.id] === {}) return message.channel.send(`Add some songs to the queue first with add`);

        const userCount = channel.members.filter(m => !m.user.bot).size
        const requiredVotes = userCount === 2 ? 2 : (userCount % 2 === 0 ? userCount / 2 + 1 : Math.ceil(userCount / 2));
        let dj = bot.guilds.get(message.guild.id).roles.find(role => role.name == 'dj');
        if (dj && message.member.roles.cache.has(dj.id) || channel.members.size <= 2) {
            message.channel.send('Current song has been skipped.');
            dispatcher.end();
        } else {
            if (voteSkipUsers.has(message.author.id)) {
                  return message.channel.send('you already voted to skip this song');
            }
            if (voteSkipUsers.size + 1 >= requiredVotes) {
                message.channel.send(`**__${message.author.username}__** has given the last needed vote, song has been skipped.`)
                await dispatcher.end();
                return;
            } else {
                voteSkipUsers.add(message.author.id);
              return message.channel.send(`**__${message.author.username}__** has voted to skip this song, can we get \`${requiredVotes - voteSkipUsers.size}\` more vote(s).`);
            }
          }
    },
    pause: (message, funcs) => {
        dispatcher.pause();
        message.channel.send('Music has been paused, use >resume to start playing music again.');
    },
    resume: (message, funcs) => {
        dispatcher.resume();
        message.channel.send('Music has been resumed, if paused.');
    },
    volume: (message, args, funcs) => {
        const volumetoset = parseInt(args.join(""));
        if (volumetoset > 200 || volumetoset < 0) return message.channel.send('Volume out of range!').then((response) => {
            response.delete(5000);
        });
        if (isNaN(volumetoset)) return message.channel.send("Not a valid number to set volume to!");
        dispatcher.setVolume(volumetoset / 100);
        message.channel.send(`Volume now set to: ${volumetoset}%`);
    },
    radio: async (message, args, funcs) => {
        const channel = message.member.voiceChannel;
        if (!channel || channel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
        if (channel && !channel.joinable) {
            return message.channel.send("Can't join your voice channel.");
        }
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
            return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        }
        if (message.guild.voiceConnection) return message.channel.send("Bot is aleady connected to a voice channel.");
        const station = stations[args];
        if (!station) {
            return message.channel.send("No such station found");
        }
        if (queue[message.guild.id] !== undefined && queue[message.guild.id].playing == true) return message.channel.send(`Please stop any other music before trying to play the radio.`);
        try {
            await channel.join();
        } catch (err) {
            console.log(`I could not join the voice channel: ${error.stack}`);
            return message.channel.send(`I could not join the voice channel: ${error}`);
        }
        dispatcher_radio = message.guild.voiceConnection.playStream(station.url, {
            volume: 0.25
        }), {
            bitrate: 'auto',
            passes: 6,
            quality: 'highestaudio'
        };
        dispatcher_radio.on('end', () => {
            try {
                message.member.voiceChannel.leave();
                dispatcher_radio = null;
                return message.channel.send('Radio has stopped playing.');
            } catch (err) {
                console.log(err.message);
            }
        });
        dispatcher_radio.on('error', (err) => {
            try {
                message.member.voiceChannel.leave();
                dispatcher_radio = null;
                console.log(err.stack);
                return message.channel.send('error: ' + err);
            } catch (e) {
                console.log(e.message);
            }
        });
        message.channel.send(`Now playing ${station.name}, please use the command stopradio or leave to stop the radio.`);
    },
    radioStations: (message) => {
        let reply = "__**Radio stations:**__";
        for (var station in stations) {
            const s = stations[station];

            if (!s || !s.name || !s.url) {
                continue;
            }
            reply += `\n\t**${station}** - ${s.name}`;
        }
        message.channel.send(reply);
    },
    stopRadio: (message, bot, funcs) => {
        if (dispatcher_radio === null) return message.channel.send(`The radio isnt playing any stations currently.`);
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t leave your voice channel...');
        const GuildCheck = bot.guilds.get(message.guild.id);
        if (GuildCheck.voiceConnection) {
            try {
                dispatcher_radio.end();
            } catch (err) {
                return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
            }
        } else {
            return message.channel.send('The radio isnt playing any stations currently.');
        }
    },
    currentSong: (message, funcs) => {
        if (queue[message.guild.id].playing == false) return message.channel.send('There are no songs that are currently playing.')
        message.channel.send(`Currently playing: \`${queue[message.guild.id].songs.song[0].title}\`(URL: \`${queue[message.guild.id].songs.song[0].url}\`.`);
    },
    volume: (message, args, funcs) => {
        if (queue[message.guild.id] !== undefined && queue[message.guild.id].playing == true) return message.channel.send(`I'm not currently playing any music to be able to change the volume.`);
        const volumetoset = parseInt(args[0]);
        if (volumetoset > 200 || volumetoset < 0) return message.channel.send('Volume out of range!').then((response) => {
            response.delete(5000);
        });
        if (isNaN(volumetoset)) return message.channel.send("Not a valid number to set volume to!");
        if (dispatcher_radio !== null) {
            dispatcher.setVolume(volumetoset / 100);
        } else {
            dispatcher_radio.setVolume(volumetoset / 100);
        }
        message.channel.send(`Volume now set to: ${volumetoset}%`);
    },
    shuffle: (message, funcs) => {
        if (queue[message.guild.id] === undefined || queue[message.guild.id] == {}) return message.channel.send(`The queue is empty, no songs to shuffle!`);
        function shuffle(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }
        shuffle(queue[message.guild.id].songs);
        message.channel.send('Songs in queue have been shuffled.');
    },
    removesong: (message, funcs) => {
        if (queue[message.guild.id] === undefined || queue[message.guild.id] == {}) return message.channel.send(`The queue is empty, no songs to shuffle!`);
        message.channel.send(`__**Which song would you like to remove from the queue? (type song name)**__`).then(() => {
            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                errors: ["time"],
                time: 30000
            }).then((resp) => {
                if (!resp) return;
                resp = resp.array()[0];
                function myFunction() {
                    const songQueue =  queue[message.guild.id].songs;
                    try {
                        songQueue.splice(songQueue.findIndex(v => v.title === resp.content), 1);
                    } catch (err) {
                        message.channel.send('Song was not found in the queue please try again.');
                    }
                }
                myFunction();
                message.channel.send('Song has been removed from the queue.');
            }).catch((err) => {
                if (err.message === undefined) {
                    message.channel.send('You provided no input in the time limit, please try again.');
                } else {
                    console.log(err);
                    return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
                }
            });
        });
    }
};

async function handleVideo(message, msg, query, funcs) {
    if (query.includes('https://www.youtube.com/watch?v=') && query.includes("&list=")) {
        /*var mySubString = query.substring(
            query.lastIndexOf("&list=") + 6,
        );
        const startRadioCheck = mySubString.replace(/\&/g, '').replace(/\&start\_radio\=1/g, '')*/
        function youtube_playlist_parser(url){
            var reg = new RegExp("[&?]list=([a-z0-9_-]+)","i");
            var match = reg.exec(url);
            if (match&&match[1].length>0){
                return match[1];
            }
        }    
        let playlist = youtube_playlist_parser(query);
        console.log(playlist)
        if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
        let channel = message.member.voiceChannel;
        if (!channel || channel.type !== "voice") return message.channel.send(`I couldn't find your voice channel.`);
        if (!message.guild.voiceConnection) {
            await channel.join();
        }
        const {
            body
        } = await request
            .get('https://www.googleapis.com/youtube/v3/playlistItems')
            .query({
                part: 'snippet, contentDetails',
                maxResults: 15,
                playlistId: playlist,
                key: "Google api key"
            });
        const checkIfValid = yt.validateURL(query)
        if (checkIfValid === false) return message.channel.send('Make sure the provided link is a valid youtube link.')
        await body.items.forEach((video) => {
            let url = `https://www.youtube.com/watch?v=${video.contentDetails.videoId}`;
                queue[message.guild.id].songs.push({
                    url: url,
                    title: video.snippet.title,
                    requestedBy: message.author.username
            })
            count++;
        });
        const newembed = new RichEmbed()
            .setColor(funcs.rc())
            .setDescription(`Added **${count}** songs to the queue (playlist: limit 15 songs)`);
        msg.edit(newembed);
        count = 0;
        if (queue[message.guild.id].playing == false) {
            play(message, msg, funcs, queue[message.guild.id])
        }
    } else if (query.includes("youtube.com/watch")) {
        let url = query;
        yt.getInfo(url, async (err, info) => {
            if (err) return message.channel.send(`Whoops a error occurred sorry about that. \nDetails ${err}`);
            let channel = message.member.voiceChannel;
            if (!channel || channel.type !== "voice") return message.channel.send(`I couldn't find your voice channel.`);
            if (!message.guild.voiceConnection) {
               await channel.join();
            }
            if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
            if (queue[message.guild.id].playing == true) {
                await queue[message.guild.id].songs.push({
                    url: url,
                    title: info.title,
                    requestedBy: message.author.username,
                    duration: info.length_seconds,
                });
                const newembed = new RichEmbed()
                    .setColor(funcs.rc())
                    .setDescription(`Added **${info.title}** to the queue`);
                msg.edit(newembed);
            } else {
                await queue[message.guild.id].songs.push({
                    url: url,
                    title: info.title,
                    requestedBy: message.author.username,
                    duration: info.length_seconds,
                });
                return play(message, msg, funcs, queue[message.guild.id])
            }
        });
    } else {
        try {
            const {
                body
            } = await request
                .get('https://www.googleapis.com/youtube/v3/search')
                .query({
                    type: 'video',
                    q: query,
                    maxResults: 5,
                    part: 'snippet',
                    //order: 'relevance',
                    //videoDuration: 'medium',
                    kkey: "Google api key"
                });
            if (!body.items.length) return message.channel.send('No results found for ' + query + ".");
            const output = `[1] - ${body.items[0].snippet.title}.\n[2] - ${body.items[1].snippet.title}.\n[3] - ${body.items[2].snippet.title}.\n[4] - ${body.items[3].snippet.title}.\n[5] - ${body.items[4].snippet.title}.\n# Type exit or none to cancel the command.`;
            const helpembed = new RichEmbed()
                .setColor(funcs.rc())
                .addField('Multiple options found which one would you like to play?', "```" + output + "```");
            msg.edit(helpembed)
                .then(() => {
                    message.channel.awaitMessages(m => m.author.id === message.author.id, {
                            max: 1,
                            time: 30000,
                            errors: ['time'],
                        })
                        .then(async (resp) => {
                            if (!resp) return;
                            resp = resp.array()[0];
                            let channel = message.member.voiceChannel;
                            if (!channel || channel.type !== "voice") return message.channel.send(`I couldn't find your voice channel.`);
                            if (!message.guild.voiceConnection) {
                                channel.join();
                            }
                            if (resp.content === "1") {
                                let url = `https://www.youtube.com/watch?v=${body.items[0].id.videoId}`;
                                yt.getInfo(url, async (err, info) => {
                                    if (err) return message.channel.send(`Whoops a error occurred sorry about that. \nDetails ${err}`);
                                    if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
                                    if (queue[message.guild.id].playing == true) {
                                        await queue[message.guild.id].songs.push({
                                            url: url,
                                            title: info.title,
                                            requestedBy: message.author.username,
                                            duration: info.length_seconds,
                                        });
                                        const newembed = new RichEmbed()
                                            .setColor(funcs.rc())
                                            .setDescription(`Added **${info.title}** to the queue`);
                                        msg.edit(newembed);
                                    } else {
                                        await queue[message.guild.id].songs.push({
                                            url: url,
                                            title: info.title,
                                            requestedBy: message.author.username,
                                            duration: info.length_seconds,
                                        });
                                        play(message, msg, funcs, queue[message.guild.id])
                                    }
                                });
                            } else if (resp.content === "2") {
                                let url = `https://www.youtube.com/watch?v=${body.items[1].id.videoId}`;
                                yt.getInfo(url, async (err, info) => {
                                    if (err) return message.channel.send(`Whoops a error occurred sorry about that. \nDetails ${err}`);
                                    if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
                                    if (queue[message.guild.id].playing == true) {
                                        await queue[message.guild.id].songs.push({
                                            url: url,
                                            title: info.title,
                                            requestedBy: message.author.username,
                                            duration: info.length_seconds,
                                        });
                                        const newembed = new RichEmbed()
                                            .setColor(funcs.rc())
                                            .setDescription(`Added **${info.title}** to the queue`);
                                        msg.edit(newembed);
                                    } else {
                                        await queue[message.guild.id].songs.push({
                                            url: url,
                                            title: info.title,
                                            requestedBy: message.author.username,
                                            duration: info.length_seconds,
                                        });
                                        play(message, msg, funcs, queue[message.guild.id])
                                    }
                                });
                            } else if (resp.content === "3") {
                                let url = `https://www.youtube.com/watch?v=${body.items[2].id.videoId}`;
                                yt.getInfo(url, async (err, info) => {
                                    if (err) return message.channel.send(`Whoops a error occurred sorry about that. \nDetails ${err}`);
                                    if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
                                    if (queue[message.guild.id].playing == true) {
                                        await queue[message.guild.id].songs.push({
                                            url: url,
                                            title: info.title,
                                            requestedBy: message.author.username,
                                            duration: info.length_seconds,
                                        });
                                        const newembed = new RichEmbed()
                                            .setColor(funcs.rc())
                                            .setDescription(`Added **${info.title}** to the queue`);
                                        msg.edit(newembed);
                                    } else {
                                        await queue[message.guild.id].songs.push({
                                            url: url,
                                            title: info.title,
                                            requestedBy: message.author.username,
                                            duration: info.length_seconds,
                                        });
                                        play(message, msg, funcs, queue[message.guild.id])
                                    }
                                });
                            } else if (resp.content === "4") {
                                let url = `https://www.youtube.com/watch?v=${body.items[3].id.videoId}`;
                                yt.getInfo(url, async (err, info) => {
                                    if (err) return message.channel.send(`Whoops a error occurred sorry about that. \nDetails ${err}`);
                                    if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
                                    if (queue[message.guild.id].playing == true) {
                                        await queue[message.guild.id].songs.push({
                                            url: url,
                                            title: info.title,
                                            requestedBy: message.author.username,
                                            duration: info.length_seconds,
                                        });
                                        const newembed = new RichEmbed()
                                            .setColor(funcs.rc())
                                            .setDescription(`Added **${info.title}** to the queue`);
                                        msg.edit(newembed);
                                    } else {
                                        await queue[message.guild.id].songs.push({
                                            url: url,
                                            title: info.title,
                                            requestedBy: message.author.username,
                                            duration: info.length_seconds,
                                        });
                                        play(message, msg, funcs, queue[message.guild.id])
                                    }
                                });
                            } else if (resp.content === "5") {
                                let url = `https://www.youtube.com/watch?v=${body.items[4].id.videoId}`;
                                yt.getInfo(url, async (err, info) => {
                                    if (err) return message.channel.send(`Whoops a error occurred sorry about that. \nDetails ${err}`);
                                    if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
                                    if (queue[message.guild.id].playing == true) {
                                        await queue[message.guild.id].songs.push({
                                            url: url,
                                            title: info.title,
                                            requestedBy: message.author.username,
                                            duration: info.length_seconds,
                                        });
                                        const newembed = new RichEmbed()
                                            .setColor(funcs.rc())
                                            .setImage('')
                                            .setDescription(`Added **${info.title}** to the queue`);
                                        msg.edit(newembed);
                                    } else {
                                        await queue[message.guild.id].songs.push({
                                            url: url,
                                            title: info.title,
                                            requestedBy: message.author.username,
                                            duration: info.length_seconds,
                                        });
                                        play(message, msg, funcs, queue[message.guild.id])
                                    }
                                });
                            } else if (resp.content === "none" || resp.content === "exit") {
                                message.channel.send("Cancelled play command.");
                            } else {
                                message.channel.send("Cancelled play command.");
                            }
                        })
                        .catch((err) => {
                            console.log("An error happened Error Details: " + err);
                            message.channel.send(`Didn't pick a option so command has been cancelled.`);
                        });
                }).catch((err) => {
                    console.log("An error happened Error Details: " + err);
                    message.channel.send(`Didn't pick a option so command has been cancelled.`);
                });
        } catch (err) {
            return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}

async function play(message, msg, funcs, song) {
    if (song.songs[0] === undefined || queue[message.guild.id] === undefined || queue[message.guild.id] === {}) return message.channel.send('Queue is empty, disconnecting till more is queued.').then(() => {
        queue[message.guild.id].playing = false;
        if (message.guild.voiceConnection) {
            message.member.voiceChannel.leave();
        };
        return;
    });
    dispatcher = message.guild.voiceConnection.playOpusStream(await ytdlDiscord(song.songs[0].url, {
        quality: 'highestaudio',
        filter: 'audioonly',
        highWaterMark: 1 << 25,
    }), {
        bitrate: 'auto',
        passes: 6,
    });
    dispatcher.on('end', (song, reason) => {
        if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
        if (!message.guild.voiceConnection) return queue[message.guild.id].songs = [];
        if (song == 'leave') {
            queue[message.guild.id].playing = false;
            voteSkipUsers.clear();
            message.member.voiceChannel.leave();
            return message.channel.send('Leaving the voice channel use play to listen to music again.');
        } else {
            queue[message.guild.id].songs.shift();
            voteSkipUsers.clear();
            play(message, msg, funcs, queue[message.guild.id]);
        }
    });
    dispatcher.on('error', (err) => {
        voteSkipUsers.clear();
        console.log(`Music Error: ${err.stack}`);
    });

    if (queue[message.guild.id].playing == true) {
        const newembed = new RichEmbed()
            .setColor(0xD4AF37)
            .setDescription(`Playing: ${song.songs[0].title} as requested by: ${song.songs[0].requestedBy}`);
        message.channel.send(newembed);
    } else {
        const newembed = new RichEmbed()
            .setColor(funcs.rc())
            .setDescription(`Playing: ${song.songs[0].title} as requested by: ${song.songs[0].requestedBy}`);
        msg.edit(newembed);
    }
    queue[message.guild.id].playing = true;
}
