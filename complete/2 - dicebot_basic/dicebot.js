const tokenerer = require('../../token');
const token = tokenerer.tokener();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

bot.on('message', msg => {
  var chatId = msg.chat.id;
  var message = msg.text.toString().toLowerCase();

  //////////////////////////////////////
  // version 1 - basic
  if (message.includes('roll')) {
    var diceRoll = dice(6).toString();
    bot.sendMessage(chatId, diceRoll);
  }

  /////////////////////////////////////
  // version 2 - ES6 syntax
  if (message.includes('roll')) {
    bot.sendMessage(chatId, `${dice(6).toString()}`);
  }

  ////////////////////////////////////
  // version 3 - / operator
  bot.onText(/\/roll/g, (msg, match) => {
    bot.sendMessage(chatId, `${dice(6).toString()}`);
  });
});

//////////////////////////////////////
//version 4 - more types of die
bot.onText(/\/roll6/g, (msg, match) => {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, `${dice(6).toString()}`);
});

bot.onText(/\/roll12/g, (msg, match) => {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, `${dice(6).toString()}`);
});

bot.onText(/\/roll20/g, (msg, match) => {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, `${dice(20).toString()}`);
});

//////////////////////////////////////
//version 5 - variables
bot.onText(/\/roll/g, (msg, match) => {
  var chatId = msg.chat.id;
  var splitCommand = match.input.split(' ');
  var diceNum = splitCommand[1];

  bot.sendMessage(chatId, `${dice(diceNum).toString()}`);
});

//////////////////////////////////////
//version 6 - NaN fix
bot.onText(/\/roll/g, (msg, match) => {
  var chatId = msg.chat.id;
  var splitCommand = match.input.split(' ');
  var diceNum = splitCommand[1];

  if (diceNum === undefined) {
    bot.sendMessage(chatId, `${dice(6)}`);
  } else {
    bot.sendMessage(chatId, `${dice(diceNum)}`);
  }
});

///////////////////////////////////////////////////////////////////
//dice function
function dice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

//fat arrow (advanced?)
var dicefunc = sides => Math.floor(Math.random() * sides) + 1;
