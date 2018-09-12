// @ts-nocheck
const tokenerer = require('../../token');
const token = tokenerer.tokener();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/roll/g, (msg, match) => {
  var chatId = msg.chat.id;

  const customKeyboard = {
    reply_markup: {
      keyboard: [['d6', '2d6'], ['d20', '2d20']],
      resize_keyboard: true
    }
  };

  bot.sendMessage(chatId, 'Choose your weapon!', customKeyboard);
});

bot.onText(/^d6/g, (msg, match) => {
  var chatId = msg.chat.id;
  var roll = dice(6);
  bot.sendMessage(chatId, roll);
});

bot.onText(/^2d6/g, (msg, match) => {
  var chatId = msg.chat.id;
  var roll1 = dice(6);
  var roll2 = dice(6);
  var total = roll1 + roll2;
  bot.sendMessage(chatId, roll1 + ' + ' + roll2 + ' = ' + total);
});

bot.onText(/^d20/g, (msg, match) => {
  var chatId = msg.chat.id;
  var roll = dice(20);
  bot.sendMessage(chatId, roll);
});

bot.onText(/^2d20/g, (msg, match) => {
  var chatId = msg.chat.id;
  var roll1 = dice(20);
  var roll2 = dice(20);
  var total = roll1 + roll2;
  bot.sendMessage(chatId, roll1 + ' + ' + roll2 + ' = ' + total);
});
///////////////////////////////////////////////////////////////////
//dice function
function dice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

//fat arrow (advanced?)
var dicefunc = sides => Math.floor(Math.random() * sides) + 1;
