let gameStore = []
class Game {
  constructor(obj) {
    this.id = obj.id
    this.title = obj.title
    this.status = "pending"
    this.users = obj.users
    this.cards = obj.cards
    this.num_of_players = obj.num_of_players
    this.turns = obj.turns
    gameStore.push(this)
  }

  getUsers(){
    // return userStore.filter(user => user.game_id === this.id)
  }

  getGameCards(){

  }

  changeStatus(){


  }

  getLastEntry(user) {
    let currentUsers = this.users
    let foundUser = currentUsers.find(u => u.id === user.id)
    let userIndex = currentUsers.indexOf(foundUser)
    let previousUser;
    let previousEntry;
    // return this.cards.filter(card => card.user_id == user.id)[0].entries
    console.log(`userIndex: ${userIndex}`);
    if (userIndex == 0) {
      // return the entry of user at gameUsers.length - 1
      previousUser = currentUsers[currentUsers.length - 1]
      previousEntry = this.cards.filter(card => card.user_id == previousUser.id)[0].entries.slice(-1)[0]
    } else {
      // return the entry of the previous user index
      previousUser = currentUsers[userIndex - 1]
      previousEntry = this.cards.filter(card => card.user_id == previousUser.id)[0].entries.slice(-1)[0]
    }
    return previousEntry
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
