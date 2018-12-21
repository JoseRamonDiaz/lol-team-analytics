var gg = new (require('./node_modules/op.gg-api/client.js'));
var team = require('./team.js');

async function getSummoners(){
    let teamSummoners = await team.startToGeTeamSummoners();
    console.log(teamSummoners);
}

getSummoners();

//console.log("index: " + JSON.stringify(teamSummoners));

// let summonerName = 'quantum8';
// let region = 'lan';
// gg.Summary(region, summonerName)
//     .then((response) => {
//         gg.Renew(region, response.summonerId)
//         .then(getChamps())
//         .catch((error)=>{
//             console.log(error);
//         });
//     })
//     .catch((error)=> {
//         console.log(error);
//     });

// function getChamps(){
//     gg.Champions(region, summonerName, 11)
//         .then((champions) => {
//             champions.sort(sortByPercentageDesc);
//             champions.forEach(champion => {
//                 let champStats = champion.name + "\t" + 
//                 ((champion.wins = champion.wins || 0) + (champion.losses + champion.losses || 0)) + 
//                 "\t" + champion.winRatio + "%";

//                 console.log(champStats);
//             });
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

// function sortByPercentageDesc(championA, championB){

//     //a > b
//     if(championA.winRatio > championB.winRatio){
//         return -1;
//     }

//     // a < b
//     if(championA.winRatio < championB.winRatio){
//         return 1;
//     }

//     //a == b
//     return 0;
// }