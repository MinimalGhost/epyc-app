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
}
