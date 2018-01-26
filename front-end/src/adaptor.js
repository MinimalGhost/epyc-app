let toggleListRefresh = true;

const Adaptor = (function() {

  const BASE_URL = `http://a6a0a75b.ngrok.io/api/v1`


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

      setTimeout(function(){
        gameStore = [];
        fetch(`${BASE_URL}/games`)
          .then( res => res.json())
          .then(gameData => {
            gameData.forEach(function(game) {
              new Game(game)
           })
        }).then(res =>{
          if (toggleListRefresh){
            App.renderExistingGames()
            Adaptor.getGames()
          }
        })
      }, 1000)

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
        Adaptor.getGameStatus(game_id, resp.id)
        Adaptor.createCard(resp.id)
        App.gameLobby(game_id, resp.id)
      })
    }

    static getGameStatus(game_id, user_id){
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
            App.renderInitialSentenceForm(game_id);
          } else {
            // If your response data doesn't fulfill the condition, then
            // call getGameStatus again recursively.
            // getGameStatus()
            Adaptor.updateGameState(game_id).then(res => {
              App.gameLobby(game_id, user_id)
            })
            .then(res => Adaptor.getGameStatus(game_id, user_id))
          }
        })
    }, 500);
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
        // console.log(game)
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

    static createEntry(input, user_id, card_id) {
      return fetch(`${BASE_URL}/entries`, {
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
      .then( entryData => new Entry(entryData))
    }

    static updateGameState(game_id){

      return fetch(`${BASE_URL}/games/${game_id}`)
      .then(res => res.json())
      .then(res => {
        let game = gameStore.filter(game => game.id == game_id)[0]
        game.users = res.users;
        game.status = res.status;
        game.cards = res.cards;
        game.turns = res.turns;
      })
    }


  }


})()
