module.exports = {
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://malasia@localhost/recipe-book', 
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development'
    //"https://server-book-recipe.herokuapp.com/",
    // API_TOKEN:process.env.DATABASE_URL || 'postgresql://malasia@localhost/recipe-book',
}