let gameStore = []
class Game {
  constructor(obj) {
    this.id = obj.id
    this.title = obj.title
    this.status = "pending"
    this.num_of_players = obj.num_of_players
    this.turns = this.num_of_players
    gameStore.push(this)
  }

  getUsers(){
    return userStore.filter(user => user.game_id === this.id)
  }

  getGameCards(){

  }

  changeStatus(){


  }

  // static checkGamesStatus(){
  //
  //   return gameStore.forEach(function(game){
  //     if(game.num_of_players === game.getUsers().length) {
  //       game.status = "in progess"
  //       Adaptor.updateGame(game.status, game.id)
  //           // "Pending" changes to "In progress" when num_of_players matches total number of users with the associated game id
  //           // FETCH - PATCH: change status from "pending" to "in progress" to "complete"
  //     } else if (game.turns === 0){
  //         game.status = "complete"
  //       // "in progress" changes to "complete" when number of turns = 0
  //     }
  //   })
  // }

}
