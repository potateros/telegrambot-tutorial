const tokenerer = require('../../token');
const token = tokenerer.tokener();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

const request = require('request');
const fs = require('fs');

bot.onText(/\/usd/g, (msg, match) => {
  var chatId = msg.chat.id;
  var splitCommand = match.input.split(' ');
  var inputNum;
  if (splitCommand[1] === undefined) {
    inputNum = 1;
  } else {
    inputNum = parseInt(splitCommand[1]);
  }
  console.log(inputNum);
  var url =
    'https://free.currencyconverterapi.com/api/v6/convert?q=MYR_USD&compact=ultra';
  request(url, function(error, response, body) {
    var parseBody = JSON.parse(body);
    var rate = parseFloat(parseBody['MYR_USD']);
    if (inputNum === 1) {
      bot.sendMessage(chatId, '1MYR = ' + rate + 'USD');
    } else {
      console.log(inputNum);
      var total = inputNum * rate;
      bot.sendMessage(chatId, inputNum + 'MYR = ' + total + 'USD');
    }
  });
});
