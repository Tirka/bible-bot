import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.PGHOST,
    port: +process.env.PGPORT!,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
})

export async function testGenesis(): Promise<string> {
    const query = 'SELECT c, v, t from t_sin WHERE id >= 1001001 AND id <= 1002000'
    const genesis_1 = await pool.query(query)

    return genesis_1.rows
        .map((row) => `${row.c}:${row.v}. ${row.t}`)
        .reduce((acc, next) => acc + next + '\n', '')
}

export async function getVerse(raw: string): Promise<string | null> {
    return null
}
