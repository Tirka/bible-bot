import telegraf from 'telegraf'
import { config as config_environment } from 'dotenv'
import { testGenesis, getVerse } from './db'

config_environment()

const bot_token = process.env.TG_BOT_TOKEN!

const bot = new telegraf(bot_token)

bot.command('test', async (ctx) => {
    const test_text = await testGenesis();
    ctx.replyWithHTML(test_text)
})

bot.use(async (ctx) => {
    let verse = await getVerse(ctx.message!.text!)
    if (!verse) { verse = 'Не могу найти указанный стих' }
    ctx.replyWithHTML(verse)
})

bot.start((ctx) => ctx.reply('Start Command'))
bot.help((ctx) => ctx.reply('Help Command. Type "test"'))

bot.launch()
