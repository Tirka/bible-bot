## Необходимый софт для запуска
PostreSQL

## Как запустить бота
Клонировать репозиторий
```
git clone https://github.com/Tirka/bible-bot.git
cd ./bible-bot
```
Создать файл `.env` с переменными окружения в корневой директории и отредактировать по образцу
```
cp .env.sample .env
```
Создать базу данных и добавить в нее таблицы из дампа
```
./backups/sql/full_bible_db.sql
```
Установить зависимости
```
yarn
```
Запустить бота
```
yarn dev
```

## Источник текста
Текст библии взят отсюда http://www.rusbible.ru/download.html
```
http://download.rusbible.ru/rusbible/v.13/files/onefile/Bible.txt
```
