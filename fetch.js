const fs = require("fs");

const authToken = process.env.auth_token;
if (!authToken) {
    console.error("No auth token found");
    process.exit(1);
}

const urls = fs.readFileSync("players.list", "utf8").split("\n");
if (urls.length === 0) {
    console.error("No players found");
    process.exit(1);
}

console.log("Name,Doubles,Doubles Reliability,Singles,Singles Reliability");
start();

async function start() {
    for (const url of urls) {
        await processUrl(url);
    }
}

async function processUrl(url) {
    const id = extractIdFromUrl(url);
    if (!id) {
        console.error("No ID found");
        return;
    }

    try {
        const profile = await getPlayerProfile(id);
        displayProfile(profile);
    } catch (error) {
        console.error(`Failed to fetch profile for ID ${id}:`, error);
    }
}

function extractIdFromUrl(url) {
    const match = url.match(/\/profiles\/(\d+)/);
    return match ? match[1] : null;
}

async function getPlayerProfile(playerId) {
    const url = `https://api.utrsports.net/v1/player/${playerId}/profile`;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'cookie': `jwt=${authToken}`
    };

    const response = await fetch(url, {
        method: 'GET',
        headers,
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}

function displayProfile({ firstName, lastName, doublesUtrDisplay, singlesUtrDisplay, ratingProgressDoubles, ratingProgressSingles }) {
    const doubles = doublesUtrDisplay.replace("0.00", "");
    const singles = singlesUtrDisplay.replace("0.00", "");
    console.log(`${firstName} ${lastName},${doubles},${ratingProgressDoubles},${singles},${ratingProgressSingles}`);
}