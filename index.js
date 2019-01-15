const cTable = require('console.table');
var gg = new (require('./node_modules/@slayermx/lol/client.js'));
var team = require('./team.js');
let region = 'lan';

start();

async function start() {
    let summoners = await getSummoners();
    printSummoners(summoners);
}

async function getSummoners() {
    return new Promise(async (resolve, reject) => {
        let teamSummoners = await team.startToGeTeamSummoners();
        await updateSummoners(teamSummoners);

        let summoners = [];
        for (var i = 0; i < teamSummoners.length; i++) {
            summoners.push(await getChamps(region, teamSummoners[i]));
        }

        resolve(summoners);
    });
}

function printSummoners(summoners) {
    for (var i = 0; i < summoners.length; i++) {
        console.table(summoners[i].name, summoners[i].champStats);
    }
}

async function updateSummoners(teamSummoners) {
    return new Promise((resolve, reject) => {

        for (var summoner = 0; summoner < teamSummoners.length; summoner++) {
            gg.Summary(region, teamSummoners[summoner]).then((resp) => {
                gg.Renew(region, resp.summonerId).then((resp2) => {
                    resolve(resp2);
                });
            });
        }
    });
}

function getChamps(region, summonerName) {
    return gg.Champions(region, summonerName, 11)
        .then((champions) => {
            return new Promise((resolve, reject) => {
                champions.sort(sortByPercentageDesc);
                let usefulChampStats = getUsefulStats(champions);
                let summoner = [];
                summoner.name = summonerName;
                summoner.champStats = usefulChampStats;
                resolve(summoner);
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

function getUsefulStats(champions) {

    let usefulChampStats = new Array();

    for (var element = 0; element < champions.length; element++) {
        usefulChampStats.push({ name: champions[element].name, wins: champions[element].wins || 0, losses: champions[element].losses || 0, winRatio: champions[element].winRatio + '%' });
    }

    return usefulChampStats;
}

function sortByPercentageDesc(championA, championB) {

    //a > b
    if (championA.winRatio > championB.winRatio) {
        return -1;
    }

    // a < b
    if (championA.winRatio < championB.winRatio) {
        return 1;
    }

    //a == b
    return 0;
}