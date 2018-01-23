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
}
