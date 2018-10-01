const path = require('path');   // Used to construct paths
const fs = require('fs');       // Used to access FileSystem

// Creates timestamp upon loading, stylized as 
//    Mon Oct 01 2018, 16:30
let d = new Date();
let timestamp = `${d.toDateString()}, ${d.getHours()}:${d.getMinutes()}`;

// Creates an absolute path to the chirps JSON file
let chirpsPath = path.join(__dirname, '../chirps.json');

let chirps = [
    {
        "id": 1,
        "author": "Andrew Cartwright",
        "username": "atlc",
        "timestamp": timestamp,
        "body": "Hello wooooorld!"
    },
    {
        "id": 2,
        "author": "Andrew Cartwright",
        "username": "atlc",
        "timestamp": timestamp,
        "body": "Can't believe I'm this far in my @CovalenceIO coursework already!"
    },
    {
        "id": 3,
        "author": "Andrew Cartwright",
        "username": "atlc",
        "timestamp": timestamp,
        "body": "Thanks for all the hard work you do, @nodejs team!!"
    },
    {
        "id": 4,
        "author": "Andrew Cartwright",
        "username": "atlc",
        "timestamp": timestamp,
        "body": "Fork this project's @github repo at https://github.com/atlc/NodeJsLab"
    },
    {
        "id": 5,
        "author": "Andrew Cartwright",
        "username": "atlc",
        "timestamp": timestamp,
        "body": "TEST TWEET BOTTOMTEXT"
    }
];

// Convert the array of objects into a passable JSON string
let chirpData = JSON.stringify(chirps, null, 2); 
// Writes the contents of the stringified chirps array to the chirps file
fs.writeFileSync(chirpsPath, chirpData);

// Reads the content of the chirps file
let readChirps = fs.readFileSync(chirpsPath);
// Parses the raw buffer back into readable JSON
console.log(JSON.parse(readChirps));