export type Intent = {
    book: string,
    chapter: number,
    verse: number
}

export function parse_intent(raw: string): Intent | 'Неправильно сформирован запрос' {
    const parts = raw.split(/[ :]/)
    if (parts.length === 3) {
        const book = parts[0]
        const chapter = +parts[1]
        const verse = +parts[2]
        if (Number.isInteger(chapter) && Number.isInteger(verse)) {
            return { book, chapter, verse }
        }
    }
    return 'Неправильно сформирован запрос'
}
