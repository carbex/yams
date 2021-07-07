export default function(game = {}, action) {
    if(action.type === 'addGame') {
        var newGame = action.game
        console.log(newGame)
        return newGame
    } else {
        return game
    }
}