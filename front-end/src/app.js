class App {
  let main_body_div = document.getElementsByClassName("container")[0]

  static init() {

    // Start Game
    let startButton = document.getElementById("create-new-game-button")
    startButton.addEventListener("click", App.NewGame)

    let submitNewGameButton = document.getElementById("submit-new-game-button")
    submitNewGameButton.addEventListener("submit", App.submitNewGame)

    let joinGameButton = document.getElementById("current-games-button")
    joinGameButton.addEventListener("click", App.joinExistingGame)

  }


  static NewGame(){

    main_body_div.innerHTML = ''

    let new_game_form = document.createElement("form")
    new_game_form.className = 'new-game-form'
    new_game_form.innerHTML =
    `<p>Please enter the following information to play!</p>
    <label for="title">Title of Game</label>
    <input type="text" name="title" value="Game Title"><br>
    <label for="num_of_players">Number of Players</label>
      <input type="text" name="num_of_players" value="Number of Players"><br>
      <input type="submit" id="submit-new-game-button" name="start" value="Start New Game">`
    main_body_div.append(new_game_form)
  }

// handle submit new game
  static submitNewGame(){
    // need a fetch to post here
    // Adaptor.createNewGame().then(resp => App.enterLobby); --> this is where submitNewGame will be called?
  }

  static enterLobby(){

  }

  static joinExistingGame(){
    main_body_div.innerHTML = ''
    let gamesToJoin = document.createElement("div")
    gamesToJoin.innerHTML = `<h2>Select a Game to Join!</h2>`
    let pendingGames = gameStore.filter(game => game.status === "pending")

    pendingGames.forEach(game => {
      let game_p = document.createElement("p")
      game_p.innerHTML =
      `${game.title} - <button id="join-game-button" type="button" name="button">Join</button>`
      gamesToJoin.append(game_p)
    })
  }

  // handle startGame

  // handle turns

  // handle submitInput

  // handle submitInput

  //



}
