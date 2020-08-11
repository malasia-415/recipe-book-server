module.exports = {
    DATABASE_URL:'postgresql://malasia@localhost/recipe-book',
    PORT:8000,
    API_TOKEN:process.env.DATABASE_URL || 'postgresql://dunder-mifflin@localhost/bookmarks',
}