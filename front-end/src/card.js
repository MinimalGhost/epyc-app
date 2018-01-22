let cardStore = []

class Card {
  constructor(id, user_id) {
    this.id = id
    this.user_id = user_id
    cardStore.push(this)
  }

  getEntries() {
    return entryStore.filter( entry => entry.card_id === this.id)
  }
}
