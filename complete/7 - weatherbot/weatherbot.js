const tokenerer = require('../../token');
const token = tokenerer.tokener();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

const request = require('request');

bot.onText(/\/weather/g, (msg, match) => {
  var chatId = msg.chat.id;
  var url =
    'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22petaling%20jaya%2C%20my%22)%20and%20u%3D%27c%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  request(url, function(error, response, body) {
    var json = JSON.parse(body);
    var location = json.query.results.channel.location.city;
    var temp = json.query.results.channel.item.condition.temp;
    var sky = json.query.results.channel.item.condition.text;
    var text =
      'The weather in ' +
      location +
      ' is currently ' +
      sky +
      ' with a temperature of ' +
      temp +
      ' degrees.';
    bot.sendMessage(chatId, text);
  });
});
