let userStore = []
class User {
  constructor(id, name, game_id) {
    this.id = id
    this.name = name
    this.game_id = game_id
    userStore.push(this)
  }

  function getCard() {
    return cardStore.filter(card => card.user_id === this.id)
  }
}
