const tokenerer = require('../../token');
const token = tokenerer.tokener();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

const fs = require('fs');
const dir = './catphotos/';

var numOfPhotos;
fs.readdir(dir, (err, files) => {
  numOfPhotos = files.length;
});

function randCat(numOfPhotos) {
  return Math.floor(Math.random() * numOfPhotos) + 1;
}

bot.onText(/\/cat/g, (msg, match) => {
  var chatId = msg.chat.id;
  bot.sendPhoto(chatId, `.catphotos/${randCat(numOfPhotos)}.jpg`, {
    caption: 'cat.'
  });
});
