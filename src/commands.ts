import { ContextMessageUpdate } from 'telegraf'

import { parse_intent } from './parser'
import { get_verse } from './db'

export function cmd_help(ctx: ContextMessageUpdate) {
    ctx.reply('This help command is not ready yet')
}

export function cmd_start(ctx: ContextMessageUpdate) {
    ctx.reply('Start Command')
}

export async function cmd_intent(ctx: ContextMessageUpdate) {
    if (!ctx.message) { return }
    const intent = parse_intent(ctx.message!.text!)
    if (intent === 'Неправильно сформирован запрос') {
        ctx.replyWithHTML(intent)
    }
    else {
        ctx.replyWithHTML(await get_verse(intent))
    }
}
