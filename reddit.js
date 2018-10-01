const path = require('path');   // Used to construct paths
const fs = require('fs');       // Used to access FileSystem
const request = require('request-promise'); // Used for making requests

// Creates absolute path to my reddit data file
let popularDataPath = path.join(__dirname, './popular-articles.json');

request('https://reddit.com/r/popular.json', (error, res, body) => {
    let articles = [];

    if (error) console.log(error);
    
    JSON.parse(body).data.children.forEach(article => {
        let extractedArticle = {
            "title": article.data.title,
            "url": article.data.url,
            "author": article.data.author
        }
        articles.push(JSON.stringify(extractedArticle));
    });

    fs.appendFileSync(popularDataPath, articles);
});