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
  // if (message.includes('roll')) {
  //   bot.sendMessage(chatId, `${dice(6).toString()}`);
  // }

  ////////////////////////////////////
  // version 3 - / operator
  bot.onText(/\/roll/g, (msg, match) => {
    var diceRoll = dice(6).toString();
    bot.sendMessage(chatId, diceRoll);
  });
});

//////////////////////////////////////
//version 4 - more types of die
bot.onText(/\/roll6/g, (msg, match) => {
  var chatId = msg.chat.id;
  var diceRoll = dice(6).toString();
  bot.sendMessage(chatId, diceRoll);
});

bot.onText(/\/roll12/g, (msg, match) => {
  var chatId = msg.chat.id;
  var diceRoll = dice(12).toString();
  bot.sendMessage(chatId, diceRoll);
});

bot.onText(/\/roll20/g, (msg, match) => {
  var chatId = msg.chat.id;
  var diceRoll = dice(20).toString();
  bot.sendMessage(chatId, diceRoll);
});

//////////////////////////////////////
//version 5 - variables
bot.onText(/\/roll/g, (msg, match) => {
  var chatId = msg.chat.id;
  var splitCommand = match.input.split(' ');
  var diceNum = splitCommand[1];
  var diceRoll = dice(diceNum).toString();
  bot.sendMessage(chatId, diceRoll);
});

//////////////////////////////////////
//version 6 - NaN fix
bot.onText(/\/roll/g, (msg, match) => {
  var chatId = msg.chat.id;
  var splitCommand = match.input.split(' ');
  var diceNum = splitCommand[1];
  var diceRoll = dice(diceNum).toString();

  if (diceNum === undefined) {
    diceNum = '6';
    bot.sendMessage(chatId, diceRoll);
  } else {
    bot.sendMessage(chatId, diceRoll);
  }
});

/**
 * dice function
 **/
function dice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * fat arrow (advanced?)
 * var dicefunc = sides => Math.floor(Math.random() * sides) + 1;
 **/
