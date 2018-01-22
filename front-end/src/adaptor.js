const Adaptor = (function() {

  const BASE_URL = `http://localhost:3000/api/v1`

  return class Adaptor {

    static getUsers() {
      return fetch(`${BASE_URL}/users`)
        .then( res => res.json())
        .then(userData => new User(userData.id, userData.name, userData.game_id))
    }

    static getGames() {
      return fetch(`${BASE_URL}/games`)
        .then( res => res.json())
        .then(gameData => new Game(gameData.id, gameData.title, gameData.status, gameData.num_of_players))
    }

    static getCards() {
      return fetch(`${BASE_URL}/cards`)
        .then( res => res.json())
        .then( cardData => new Card(cardData.id, cardData.user_id))
    }

    static getEntries() {
      return fetch(`${BASE_URL}/entries`)
        .then( res => res.json())
        .then( entryData => new Entry(entryData.id, entryData.user_id))
    }

    // static createNewGame() {
    //
    // }
  }

})()
