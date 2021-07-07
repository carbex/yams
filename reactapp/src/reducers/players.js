export default function(players = {}, action) {
    if(action.type === 'addPlayers') {
        var newPlayers = action.players
        console.log(newPlayers)
        return newPlayers
    } else {
        return players
    }
}

// export default function(players = [], action) {
//         if(action.type === 'addPlayers') {
//             var newPlayers = action.players
//             console.log(newPlayers)
//             return newPlayers
//         } else {
//             return players
//         }
//     }