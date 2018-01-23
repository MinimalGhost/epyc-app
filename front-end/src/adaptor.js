const Adaptor = (function() {

  const BASE_URL = `http://localhost:3000/api/v1`

  return class Adaptor {

    static getUsers() {
      fetch(`${BASE_URL}/users`)
        .then( res => res.json())
        .then(userData => {
          userData.forEach(function(user) {
            let new_user = new User(user)
         })
      })
    }

    static getGames() {
      fetch(`${BASE_URL}/games`)
        .then( res => res.json())
        .then(gameData => {
          gameData.forEach(function(game) {
            new Game(game)
         })
         App.renderExistingGames()
      })
    }

    static getCards() {
      fetch(`${BASE_URL}/cards`)
        .then( res => res.json())
        .then(cardData => {
          cardData.forEach(function(card) {
            new Card(card)
         })
      })
    }

    static getEntries() {
      fetch(`${BASE_URL}/entries`)
        .then( res => res.json())
        .then(entryData => {
          entryData.forEach(function(entry) {
            new Entry(entry)
         })
      })
    }

    static createNewUser(newuser, game_id){
      fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: `${newuser}`,
          game_id: `${game_id}`
        })
      }).then(res => res.json())
      .then(json => new User(json))
      .then(resp => App.gameLobby(game_id))

    }


    static createNewGame(title, num_of_players){
      fetch(`${BASE_URL}/games`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: `${title}`,
          num_of_players: `${num_of_players}`,
          status: `pending`
        })
      }).then(res => res.json()).
      then(json => {
        let game = new Game(json)
        console.log(game)
        App.renderNewUser(game.id)
      })
    }
  }


})()
