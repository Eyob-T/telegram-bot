
const tkn = require('./token')
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(tkn.token(), {polling:true})
const request = require('request')

bot.onText(/\/echo (.+)/, (msg, match) =>{
    let chatId = msg.chat.id
    let echo = match[1]

    bot.sendMessage(chatId,echo)
})

bot.onText(/\/movie (.+)/, (msg,match) => {
    var movie = match[1]
    const chatId = msg.chat.id
    request(`http://www.omdbapi.com/?apikey=${tkn.apiKey}&t=${movie}`, (error,response,body) => {

    if(!error && response.statusCode == 200){
        bot.sendMessage(chatId, '_Looking for _' + movie + ' ... ', {parse_mode:'Markdown'})
        .then((msg) => {
            bot.sendMessage(chatId, 'Result:\n ' + body)
        })
       
    }
    })
})