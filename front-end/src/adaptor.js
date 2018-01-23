const Adaptor = (function() {

  const BASE_URL = `http://d576806e.ngrok.io/api/v1`

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
        App.gameLobby(game_id)
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
            console.log(data)
            // start the game
            // doSomethingWithData()
            App.renderGame();
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
