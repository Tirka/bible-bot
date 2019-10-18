import { Intent } from './parser'
import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.PGHOST,
    port: +process.env.PGPORT!,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
})

export async function test_genesis(): Promise<string> {
    const query = 'SELECT c, v, t from t_sin WHERE id >= 1001001 AND id <= 1002000'
    const genesis_1 = await pool.query(query)

    return genesis_1.rows
        .map((row) => `${row.c}:${row.v}. ${row.t}`)
        .reduce((acc, next) => acc + next + '\n', '')
}

export async function get_verse(intent: Intent): Promise<string | 'Стих не найден'> {
    const query =
        `SELECT t FROM t_sin
        WHERE b=(
            SELECT book_id FROM key_abbreviations
            WHERE abbr=LOWER('${intent.book}')
        )
        AND c='${intent.chapter}'
        AND v='${intent.verse}'`
    const result = await pool.query(query)
    if (result.rows[0] && result.rows[0].t) {
        return result.rows[0].t
    }
    return 'Стих не найден'
}
