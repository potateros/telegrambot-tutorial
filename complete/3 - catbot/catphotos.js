const tokenerer = require('../../token');
const token = tokenerer.tokener();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

// Reading from filesystem
const fs = require('fs');
const dir = './catphotos/';
var numOfPhotos;
fs.readdir(dir, (err, files) => {
  numOfPhotos = files.length;
});

// Generate random number
function randCat(numOfPhotos) {
  return Math.floor(Math.random() * numOfPhotos) + 1;
}

// Receiving command
bot.onText(/\/cat/g, (msg, match) => {
  var chatId = msg.chat.id;

  // Chooses a random cat photo using random number generator
  // Normal version (Must use +, cannot use , as , adds space)
  var randomNum = randCat(numOfPhotos);
  const stream = fs.createReadStream('./catphotos/' + randomNum + '.jpg');
  bot.sendPhoto(chatId, stream, {
    caption: 'cat.'
  });
  /* Advanced version
  bot.sendPhoto(chatId, `./catphotos/${randCat(numOfPhotos)}.jpg`, {
    caption: 'cat.'
  });
  */
});
