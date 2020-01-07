const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

const config = require('./config.json');

config.token = process.env.CLIENT_TOKEN;

var story = "";

var prevAuthId = "";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    if (msg.content.startsWith(`${config.prefix}history`)) {
        msg.channel.send('Here is the story so far: ');
        msg.channel.send(story);
    }

    else if (msg.content.startsWith(`${config.prefix}add `)) {
        if (msg.author.id != prevAuthId) {
            story += msg.content.substring(`${config.prefix}add `.length);
            prevAuthId = msg.author.id;
        } else {
            msg.channel.send("Sorry you must wait for your turn!");
        }
    }

    else if (msg.content.startsWith(`${config.prefix}restart`)) {
        msg.channel.send("Heres the full story: ");
        msg.channel.send(story);
        story = "";
        msg.channel.send("Reset complete!");
    }

    else if (msg.content.startsWith(`${config.prefix}help`)) {
        msg.reply(' Here is a list of commands: \n!story help - For this menu\n!story history - For the story so far\n!story add - To add to the story\n!story restart - to restart a new game.')
    }

  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(config.token);