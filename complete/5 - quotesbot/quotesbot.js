const tokenerer = require('../../token');
const token = tokenerer.tokener();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

//read quotes.json
const quoteList = require('./quotes.json');
var numOfQuotes = quoteList['quotes'].length;

function randQuote(numOfQuotes) {
  return Math.floor(Math.random() * numOfQuotes) + 1;
}

bot.onText(/\/quote/g, (msg, match) => {
  var chatId = msg.chat.id;
  var message = msg.text.toString().toLowerCase();

  var generatedRan = randQuote(numOfQuotes);

  var quote = quoteList['quotes'][generatedRan]['quote'];
  var author = quoteList['quotes'][generatedRan]['author'];
  bot.sendMessage(chatId, quote + ' - ' + author);

  /* without using variables
  bot.sendMessage(
    chatId,
    `${quoteList['quotes'][generatedRan]['quote'] +
      ' - ' +
      quoteList['quotes'][generatedRan]['author']}`
  );
  */
});
