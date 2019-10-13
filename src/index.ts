import telegraf from 'telegraf'
import { Pool } from 'pg'
import { config as config_environment } from 'dotenv'

config_environment()

const bot_token = process.env.TG_BOT_TOKEN

const bot = new telegraf(bot_token)

const pool = new Pool({
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
})

bot.hears('test', async (ctx) => {
    let z = await pool.query('SELECT * from key_english LIMIT 5')
    ctx.reply(JSON.stringify(z.rows, null, 2))
})

bot.start((ctx) => ctx.reply('Start Command'))
bot.help((ctx) => ctx.reply('Help Command. Type "test"'))

bot.launch()