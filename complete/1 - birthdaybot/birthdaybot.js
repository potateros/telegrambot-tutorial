const tokenerer = require('../../token');
const token = tokenerer.tokener();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

bot.on('message', msg => {
  var chatId = msg.chat.id;
  var message = msg.text.toString().toLowerCase();

  // version 1 - basic
  if (message.includes('happy birthday') || message.includes('happy bday')) {
    bot.sendMessage(chatId, 'thank you!');
  }

  // version 2 - thank you
  if (message.includes('happy birthday') || message.includes('happy bday')) {
    bot.sendMessage(chatId, 'thank you @' + msg.from.username + '!');
  }

  // version 3 - thank you first_name
  if (message.includes('happy birthday') || message.includes('happy bday')) {
    if (msg.from.username !== 'undefined') {
      bot.sendMessage(chatId, 'thank you @' + msg.from.username + '!');
    } else {
      bot.sendMessage(chatId, 'thank you ' + msg.from.first_name + '!');
    }
  }

  // version 4 - ternary
  if (message.includes('happy birthday') || message.includes('happy bday')) {
    bot.sendMessage(
      chatId,
      `thank you @${
        msg.from.username === 'undefined'
          ? msg.from.first_name
          : msg.from.username
      }`
    );
  }
});
