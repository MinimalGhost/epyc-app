const Adaptor = (function() {

  const BASE_URL = `http://localhost:3000/api/v1`

  return class Adaptor {

    static getUsers() {
      fetch(`${BASE_URL}/users`)
        .then( res => res.json())
        .then(userData => {
          userData.forEach(function(user) {
            new User(user.id, user.name, user.game_id)
         })
      })
    }

    static getGames() {
      fetch(`${BASE_URL}/games`)
        .then( res => res.json())
        .then(gameData => {
          gameData.forEach(function(game) {
            new Game(game.id, game.title, game.status, game.num_of_players, game.turns)
         })
      })
    }

    static getCards() {
      fetch(`${BASE_URL}/cards`)
        .then( res => res.json())
        .then(cardData => {
          cardData.forEach(function(card) {
            new Card(card.id, card.user_id)
         })
      })
    }

    static getEntries() {
      fetch(`${BASE_URL}/entries`)
        .then( res => res.json())
        .then(entryData => {
          entryData.forEach(function(entry) {
            new Entry(entry.id, entry.user_id, entry.card_id)
         })
      })
    }

    // static createNewGame() {
    //
    // }
  }

})()
