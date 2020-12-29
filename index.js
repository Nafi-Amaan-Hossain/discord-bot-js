const Discord = require('discord.js');
const https = require('https');
const client = new Discord.Client();
const botimg = 'https://vectr.com/tmp/d1tfTqAzBR/a1gpoJghMA.png?width=640&height=640&select=a1gpoJghMApage0'
const bot_pr = '$$'
const botname = 'TesteeQ'
const {
  randomJoke, randomProgrammingJoke, randomKnockJoke,  randomGeneralJoke
  } = require('./jokesvalidator');



 
/*Make sure to add user end guide in this helpEmbed constant once you add a new feature. DO NOT FORGET!!*/

const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${botname} commands`)
    .setAuthor(`${botname}, smartly me:`, botimg, 'https://discord.gg')
    .setDescription(`Usage guide to ${botname}`)
    .addField('$$help-', 'Help and info', true)
    .addField('$$careless-', 'Make me act careless', true)
    .addField('$$code-', 'Understand my psycology and physiology.', true)
    .addField('$$madeof-', 'Know my anatomy! How I\'m created.', true)
    .addField('$$joke-', 'Send a random joke! Forgive me if some thing is lame!', true)
    .setFooter('Happy \'Discording\'!! :wink:', botimg)
    .setTimestamp();
/////////////////////////////////////////////////

//This is for console info.... once, it is up.
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

///Event catcher for message
client.on('message', (msg) => {
    //Filtering out to check for only the ones intended.
    if (msg.content.startsWith(bot_pr)) {
      //For utility in program flow and multi word comment, command terminates with '-' 
        let cmd_end_index = msg.content.indexOf('-');
        //Separating the values between bot prefix ('$$') and termination character ('-')
        let cmd = msg.content.substring(2, cmd_end_index);
        //Switch to differentiate bot commands 
        switch (cmd) {
            case "help":

                msg.channel.send(msg.author, helpEmbed);

                break;

            case "careless":

                msg.channel.send("Whatever, whenever, whoever, however,wherever \n¯\\_(ツ)_/¯");

                break;

            case "code":

                msg.channel.send("Check my source code at GH(GitHub)\n;-)");

                break;

            case "madeof":

                msg.channel.send(new Discord.MessageEmbed()
                    .setColor('teal')
                    .setTitle(`${botname}`)
                    .setDescription("Heart of javaScript and soul of C++, nurtured and taught by a developer, Nafi."));

                break;

            case "joke":
               let randjoke = randomJoke();
               msg.channel.send('*'+ randjoke.setup + "* " + randjoke.punchline);
               delete randjoke;
               break;


        }

    }


});

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}!!!!!! `);
});

client.login(process.env.BOT_TOKEN);





















////////////////////////

/* https://repl.it requires an http server to be active,
 in order to to keep the code from terminating. */
//Starting the keep alive express code. 
const express = require('express');
const LimitingMiddleware = require('limiting-middleware');

const app = express();

app.use(new LimitingMiddleware().limitByIp());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Try <a href="/ping" rel="noopener noreferer">/ping</h1>');
});

app.get('/ping', (req, res) => {
  res.send('<h1>PONG!!!!!</h1>');
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: 'error', message: err.message
  });
});

const PORT = process.env.HPORT || 8000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

