let userStore = []
class User {
  constructor({id, name, game_id, entries}) {
    this.id = id
    this.name = name
    this.game_id = game_id
    this.entries = entries
    userStore.push(this)
  }

  getCard() {
    return cardStore.filter(card => card.user_id === this.id)
  }

  // getLastEntry(game) {

    // let main_body_div = document.getElementsByClassName("container")[0]
    // game = gameStore.filter(game => game.id == game_id)[0]
    // user = userStore.filter(user => user.id == main_body_div.dataset.user)

    // let gameUsers = game.getUsers()
    // console.log(`user is: ${JSON.stringify(this)}, gameUsers is: ${JSON.stringify(gameUsers)}`);
    // let userIndex = gameUsers.indexOf(this)
    // let previousUser;
    // console.log(`userIndex is ${JSON.stringify(userIndex)}`);
    // if (userIndex == 0) {
    //   // return the entry of user at gameUsers.length - 1
    //   console.log('im in getLastEntry if block');
    //   previousUser = gameUsers[gameUsers.length - 1]
    //
    //   console.log(`previousUser is ${previousUser}`);
    // } else {
    //   // return the entry of the previous user index
    //   console.log('im in getLastEntry else block');
    //   previousUser = gameUsers[userIndex - 1]
    //   console.log(`previousUser is ${previousUser}`);
    // }
    // debugger
    // return previousUser.entries.slice(-1)[0]
  // }
}
