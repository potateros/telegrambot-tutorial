const TelegramBot = require('node-telegram-bot-api') //Imports node-telegram-bot-api
const token = "yeet"//Put your bot token here
const bot = new TelegramBot(token, {polling: true}) //creates a bot object from TelegramBot from node-telegram-bot-api

// Switches on the bot, then scans each message that gets sent to the bot.
bot.on('message', (msg) => {

})
