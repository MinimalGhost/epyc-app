let gameStore = []
class Game {
  constructor(obj) {
    this.id = obj.id
    this.title = obj.title
    this.users = obj.users
    this.cards = obj.cards
    this.num_of_players = obj.num_of_players
    this.turns = obj.turns

    if(obj.status){
      this.status = obj.status
    } else {
      this.status = "pending"
    }
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
    if (userIndex == 0) {
      // return the entry of user at gameUsers.length - 1
      previousUser = currentUsers[currentUsers.length - 1]

      previousEntry = [].concat.apply([], this.cards.map(card => card.entries)).filter(entry => entry.user_id === previousUser.id).sort(compare).slice(-1)[0]
    } else {
      // return the entry of the previous user index
      previousUser = currentUsers[userIndex - 1]
      previousEntry = [].concat.apply([], this.cards.map(card => card.entries)).filter(entry => entry.user_id === previousUser.id).sort(compare).slice(-1)[0]
    }
    return previousEntry
  }

}

function compare(a,b) {
  if (a.id < b.id)
    return -1;
  if (a.id > b.id)
    return 1;
  return 0;
}
