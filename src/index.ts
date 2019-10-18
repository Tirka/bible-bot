import telegraf from 'telegraf'
import { config as config_environment } from 'dotenv'

import { cmd_help, cmd_intent, cmd_start } from './commands'

config_environment()

const bot = new telegraf(process.env.TG_BOT_TOKEN!)

bot.start(cmd_start)
bot.help(cmd_help)

bot.use(cmd_intent)

bot.launch()
