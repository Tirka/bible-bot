import telegraf from 'telegraf'
import { Pool } from 'pg'
import { config as config_environment } from 'dotenv'
import {  } from 'lodash'

config_environment()

const bot_token = process.env.TG_BOT_TOKEN!

const bot = new telegraf(bot_token)

const pool = new Pool({
    host: process.env.PGHOST,
    port: +process.env.PGPORT!,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
})

bot.hears('test', async (ctx) => {
    const query = 'SELECT c, v, t from t_sin WHERE id > 1001001 AND id <= 1002000'
    const genesis_1 = await pool.query(query)

    const text =
        genesis_1.rows
        .map((row) => `${row.c}:${row.v}. ${row.t}`)
        .reduce((acc, next) => acc + next + '\n', '')

    ctx.reply(text)
})

bot.start((ctx) => ctx.reply('Start Command'))
bot.help((ctx) => ctx.reply('Help Command. Type "test"'))

bot.launch()
