const tokenerer = require('./token');
const token = tokenerer.tokener();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

const request = require('request');

var chatId = 4994094;

bot.on('message', msg => {
  var message = msg.text.toString().toLowerCase();

  console.log(msg);
  bot.sendMessage(chatId, 'this for tony');

  chatId = msg.chat.id;
});

// bot.on('message', msg => {
//   var message = msg.text.toString().toLowerCase();

//   console.log(msg);
//   bot.sendMessage(chatId, 'this for eric');
// });
