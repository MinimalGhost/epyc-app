gameStore = []

class Game {
  constructor(id, title, status, num_of_players) {
    this.id = id
    this.title = title
    this.status = status
    this.num_of_players = num_of_players
    this.turns = num_of_players
    gameStore.push(this)
  }

  getUsers(){
    return userStore.filter(user => user.game_id === this.id)
  }

  getGameCards(){

  }

  changeStatus(){
    if(num_of_players === this.getUsers().length){
      this.status = "in progess"
            // "Pending" changes to "In progress" when num_of_players matches total number of users with the associated game id
          // FETCH - PATCH: change status from "pending" to "in progress" to "complete"
    } else if (this.turns === 0){
        this.status = "complete"
      // "in progress" changes to "complete" when number of turns = 0
    }
  }





}
