const path = require('path');   // Used to construct paths
const fs = require('fs');       // Used to access FileSystem
const request = require('request-promise'); // Used for making requests
const http = require('http');    // Used for making HTTP requests
const https = require('https');   // Used for making HTTPS requests

let downloads = path.join(__dirname, '../downloads');
let popularDataPath = path.join(downloads, '/popular-articles.json');

request('https://reddit.com/r/popular.json', (error, res, body) => {
    if (error) console.log(error);

    let articles = JSON.parse(body).data.children;

    articles.forEach(article => {
        downloadIfMediaPresent(article.data);
        fs.appendFileSync(popularDataPath, JSON.stringify(article));
    });
});

function downloadIfMediaPresent(post) {
    if (post.is_reddit_media_domain || post.domain == 'i.imgur.com') {
        if (path.extname(post.url.toString()) != '') {
            let title = `${downloads}/${post.id}${path.extname(post.url.toString())}`;
            let media = fs.createWriteStream(title);
            
            if (post.url.toString().indexOf('https') == 0) {
                https.get(post.url, res => {
                    res.pipe(media);
                    media.on('finish', () => media.close());
                });
            } else {
                http.get(post.url, res => {
                    res.pipe(media);
                    media.on('finish', () => media.close());
                });
            }
        }
    }
}