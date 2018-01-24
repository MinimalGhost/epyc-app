const Adaptor = (function() {

  const BASE_URL = `http://5c697064.ngrok.io/api/v1`

  return class Adaptor {

    static getUsers() {
      fetch(`${BASE_URL}/users`)
        .then( res => res.json())
        .then(userData => {
          userData.forEach(function(user) {
            let new_user = new User(user)
         })
         Adaptor.getGames()
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

    static updateGame(status, game_id) {
      fetch(`${BASE_URL}/games/${game_id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          status: `${status}`
        })
      }).then(res => res.json())
      .then(res => console.log(res))
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
      .then(resp => {
        Adaptor.getGameStatus(game_id)
        Adaptor.createCard(resp.id)
        App.gameLobby(game_id, resp.id)
      })
    }

    static getGameStatus(game_id){
    // Use a set-timeout to make the first request only after 5 seconds
    setTimeout(function(){
      // After 5 seconds, make your request
      fetch(`${BASE_URL}/games/${game_id}`)
        // Convert your response to JSON
        .then(resp => resp.json())
        // If your response data fulfills some condition, do something with it
        .then(data => {

          if (data.status === "in progress") {
            // start the game
            // doSomethingWithData()

            App.renderSentenceForm(game_id);
          } else {
            // If your response data doesn't fulfill the condition, then
            // call getGameStatus again recursively.
            // getGameStatus()
            App.gameLobby(game_id)
            Adaptor.getGameStatus(game_id)
          }
        })
    }, 5000);
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
          status: `pending`,
          turns: `1`
        })
      }).then(res => res.json()).
      then(json => {
        let game = new Game(json)
        console.log(game)
        App.renderNewUser(game.id)
      })
    }

    static createCard(user_id){
      fetch(`${BASE_URL}/cards`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: `${user_id}`
        })
      }).then(res => res.json())
      .then(res => new Card(res))
    }

    static submitEntry(input, user_id, card_id) {
      fetch(`${BASE_URL}/entries`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          input: `${input}`,
          user_id: `${user_id}`,
          card_id: `${card_id}`
        })
      }).then( res => res.json())
      .then( entryData => new Entry(entryData) )
    }

    static getGameUsers(game_id) {
      fetch(`${BASE_URL}/users`)
        .then( res => res.json())
        .then(userData => {
          let gameUsers = userData.filter( user => user.game_id === game_id)
          let allEntries = gameUsers.forEach( user => Adaptor.getUserEntries(user.id))
          console.log(allEntries)
        })
      }

    static getUserEntries(user_id) {
       fetch(`${BASE_URL}/entries`)
        .then(res => res.json())
        .then( entriesData => {
          let userEntries = entriesData.filter( entry => entry.user_id === user_id)
        })
    }








  }


})()
