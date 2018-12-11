var gg = new (require('./node_modules/op.gg-api/client.js'))

// gg.Live('na')
// 	.then((json) => {
// 		console.log(json)
// 	})
// 	.catch((error) => {
// 		console.error(error)
// 	})

// gg.Live('na', function(error, data) {
// 	console.log(error || data)
// })

// gg.Renew('lan', '1766312')
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.log(error);
//     })

// gg.Champions('lan', 'slayermx117', '7')
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error)=>{
//         console.log(error);
//     });

// gg.Summary('lan', 'slayermx117')
//     .then((response)=>{
//         console.log(response);
//     })
//     .catch((error)=>{
//         console.log(error);
//     });

let summonerName = 'quantum8';
let region = 'lan';
gg.Summary(region, summonerName)
    .then((response) => {
        gg.Renew(region, response.summonerId)
        .then(getChamps())
        .catch((error)=>{
            console.log(error);
        });
    })
    .catch((error)=> {
        console.log(error);
    });

function getChamps(){
    gg.Champions(region, summonerName, 11)
        .then((champions) => {
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