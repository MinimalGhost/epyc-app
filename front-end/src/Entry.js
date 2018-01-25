let entryStore = []

class Entry {
  constructor({id, user_id, card_id}) {
    this.id = id
    this.user_id = user_id
    this.card_id = card_id
    entryStore.push(this)
  }

}
