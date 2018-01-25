let userStore = []
class User {
  constructor({id, name, game_id}) {
    this.id = id
    this.name = name
    this.game_id = game_id
    userStore.push(this)
  }

  getCard() {
    return cardStore.filter(card => card.user_id === this.id)
  }

  getLastEntry(game) {
    // let main_body_div = document.getElementsByClassName("container")[0]
    // game = gameStore.filter(game => game.id == game_id)[0]
    // user = userStore.filter(user => user.id == main_body_div.dataset.user)

    let gameUsers = game.getUsers()
    console.log(`user is: ${this}, gameUsers is: ${gameUsers}`);
    let userIndex = gameUsers.findIndex(this)

    if (userIndex == 0) {
      // return the entry of user at gameUsers.length - 1
      let previousUser = gameUsers[gameUsers.length - 1]
    } else {
      // return the entry of the previous user index
      let previousUser = gameUsers[userIndex - 1]
    }

    return previousUser.entries.slice(-1)[0]
  }
}
