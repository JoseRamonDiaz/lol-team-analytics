const cTable = require('console.table');
var gg = new (require('./node_modules/@slayermx/lol/client.js'));
var team = require('./team.js');
let region = 'lan';

getSummoners();

async function getSummoners(){
    let teamSummoners = await team.startToGeTeamSummoners();

    await updateSummoners(teamSummoners);

    for(sum in teamSummoners){
        getChamps(region, teamSummoners[sum]);
    }
    
}

async function updateSummoners(teamSummoners){
    return new Promise((resolve, reject) => {

        for(summoner in teamSummoners){
            gg.Summary(region, teamSummoners[summoner]).then((resp)=>{
                gg.Renew(region, resp.summonerId).then((resp2)=> {
                    resolve(resp2);
                });
            });
        }
    });
}

function getChamps(region, summonerName){
    gg.Champions(region, summonerName, 11)
        .then((champions) => {
            champions.sort(sortByPercentageDesc);
            let usefulChampStats = getUsefulStats(champions);
            console.table(summonerName,usefulChampStats);
        })
        .catch((error) => {
            console.log(error);
        });
}

function getUsefulStats(champions){

    let usefulChampStats = new Array();

    for(element in champions){
        usefulChampStats.push({name: champions[element].name, wins: champions[element].wins || 0, losses: champions[element].losses || 0, winRatio: champions[element].winRatio+'%'});
    }

    return usefulChampStats;
}

function sortByPercentageDesc(championA, championB){

    //a > b
    if(championA.winRatio > championB.winRatio){
        return -1;
    }

    // a < b
    if(championA.winRatio < championB.winRatio){
        return 1;
    }

    //a == b
    return 0;
}