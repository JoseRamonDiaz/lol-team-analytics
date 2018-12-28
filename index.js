var gg = new (require('./node_modules/op.gg-api/client.js'));
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
                    resolve("champs updated!");
                });
            });
        }
    });
}

function getChamps(region, summonerName){
    gg.Champions(region, summonerName, 11)
        .then((champions) => {
            printSummonerName(summonerName);
            champions.sort(sortByPercentageDesc);
            champions.forEach(champion => {
                let champStats = champion.name + "\t" + 
                ((champion.wins = champion.wins || 0) + (champion.losses + champion.losses || 0)) + 
                "\t" + champion.winRatio + "%";
                console.log(champStats);
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

function printSummonerName(name){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>" + name + ">>>>>>>>>>>>>>>>>>>>>>>>");
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