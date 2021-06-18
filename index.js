const Discord = require('discord.js');
const client = new Discord.Client();
const botimg = 'https://vectr.com/tmp/d1tfTqAzBR/a1gpoJghMA.png?width=640&height=640&select=a1gpoJghMApage0'
const bot_prefix = '$$'
const botname = 'TesteeQ'
const {
  randomJoke, randomProgrammingJoke, randomKnockJoke,  randomGeneralJoke
  } = require('./jokesvalidator');
const wikitldr = require('wikipedia-tldr')

 
/*Make sure to add user end guide in this helpEmbed constant once you add a new feature. DO NOT FORGET!!*/

const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${botname} commands`)
    .setAuthor(`${botname}, smartly me:`, botimg, 'https://discord.gg')
    .setDescription(`Usage guide to ${botname}`)
    .addField('$$help', 'Help and info', true)
    .addField('$$careless', 'Make me act careless', true)
    .addField('$$code', 'Understand my psychology and why I\'m this way.', true)
    .addField('$$madeof', 'Know my anatomy! How I\'m created.', true)
    .addField('$$joke', 'Send a random joke! Forgive me if some thing is lame!', true)
    .addField('$$wiki',"Search a word in wikipedia (Unstable)",true)
    .setFooter('Happy \'Discording\'!!', botimg)
    .setTimestamp();
/////////////////////////////////////////////////

//This is for console info.... once, it is up.
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`to ${bot_prefix}help`,{type:"Listening"})
});

///Event catcher for message
client.on('message', (msg) => {
    //Filtering out to check for only the ones intended.
    if (msg.content.startsWith(bot_prefix)) {
      msgargs = msg.content.substr(2).split(' ')
      console.log(msgargs)
        //Switch to differentiate bot commands 
        switch (msgargs[0]) {
            case "help":

                msg.channel.send(msg.author, helpEmbed);

                break;

            case "careless":

                msg.channel.send("Whatever, whenever, whoever, however,wherever \n¯\\_(ツ)_/¯");

                break;

            case "code":

                msg.channel.send("Check my source code at GH(GitHub)\n;-)  https://github.com/Nafi-Amaan-Hossain/discord-bot-js");

                break;

            case "madeof":

                msg.channel.send(new Discord.MessageEmbed()
                    .setColor('teal')
                    .setTitle(`${botname}`)
                    .setDescription("Heart of javaScript and soul of C++, nurtured and taught by a developer, Nafi."));

                break;

            case "wiki":
              if (msgargs[1] !== undefined) {
                  wikitldr(msgargs[1]).then(result => {
                    if ((result !== '') && ( result !== undefined) && (result !==null) ) {
                        result = result.extract_html
                        msg.channel.send(removeTags(result))
                    }else{
                      msg.channel.send(`Found nothing about"${msgargs[1]}"`)
                    }
                })
                } else {
                msg.channel.send(`Please specify something to search. Like ${bot_prefix}wiki javaScript`)
                }
              break;

            case "joke":
              if((msgargs[1] === undefined)){
               let randjoke = randomJoke();
               msg.channel.send('*'+ randjoke.setup + "* " + randjoke.punchline);
               delete randjoke;

              }else if ((msgargs[1].toLowerCase()==="general") || (msgargs[1].toLowerCase().startsWith("g"))){
                 
                 let genjoke = randomGeneralJoke();
                 msg.channel.send(`**${genjoke.setup}** ${genjoke.punchline}`);
               
               } else if((msgargs[1].toLowerCase()=="programming")||(msgargs[1].toLowerCase().startsWith("p"))){
                 
                 let progjoke = randomProgrammingJoke();
                 msg.channel.send(`**${progjoke.setup}** ${progjoke.punchline}`);
                 delete progjoke;

               }else if((msgargs[1].toLowerCase()=="knock")||(msgargs[1].toLowerCase().startsWith("k"))){
                 
                 let knockjoke = randomKnockJoke();
                 msg.channel.send(`**${knockjoke.setup}** ${knockjoke.punchline}`);
                 delete knockjoke;
              
               } else {

               let randjoke = randomJoke();
               msg.channel.send('*'+ randjoke.setup + "* " + randjoke.punchline);
               delete randjoke;
               
               }
               break;

            default:
                msg.channel.send(msg.author, helpEmbed);

                break;


        }

    }


});

removeTags = (str) => { 
    if ((str===null) || (str==='')) 
        return "Oops!! Something went wrong!! Try https://en.wikipedia.org/"; 
    else
        str = str.toString(); 
          
    // Regular expression to identify HTML tags in  the text and replace
    // HTML tag with a null string. 
    return str.replace( /(<([^>]+)>)/ig, ''); 
} 

client.login(process.env.BOT_TOKEN);





















////////////////////////

/* https://repl.it requires an http server running
 in order to keep the program from terminating. */
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

