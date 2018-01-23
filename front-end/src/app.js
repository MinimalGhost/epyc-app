class App {

  static init() {


    let main_div = document.getElementsByClassName("container")[0]
    main_div.addEventListener("click", App.startOrJoinGame)


    // Sumbit New Game
    main_div.addEventListener("submit", App.createUser)

  }


  static startOrJoinGame(event){
    event.preventDefault()

    if (event.target.id === "create-new-game-button"){
      App.renderGameForm()
    } else if (event.target.id === "join-game-button"){
      Adaptor.getUsers()
      // Adaptor.getGames()

    } else if (event.target.id === "submit-new-game-button"){
      let title = document.getElementById("submit-new-game-button").parentNode.title.value
      let num_of_players = document.getElementById("submit-new-game-button").parentNode.num_of_players.value
      Adaptor.createNewGame(title, num_of_players);
    } else if (event.target.id === "submit-new-user-button"){
      let new_user = document.getElementById("submit-new-user-button").parentNode.user.value
      let game_id = document.getElementById("submit-new-user-button").parentNode.game_id.value
      Adaptor.createNewUser(new_user, game_id);
    } else if(event.target.className === "join-game-id-button"){
      let game_id = event.target.dataset.id
      App.renderNewUser(game_id)
    }

  }

  static renderGameForm(){
    let main_body_div = document.getElementsByClassName("container")[0]
    main_body_div.innerHTML = ''

    let new_game_form = document.createElement("form")
    new_game_form.className = 'new-game-form'
    new_game_form.innerHTML =
    `<p>Please enter the following information to play!</p>
    <label for="title">Title of Game</label>
    <input type="text" name="title" placeholder="Game Title"><br>
    <label for="num_of_players">Number of Players</label>
      <input type="number" name="num_of_players" placeholder="Number of Players"><br>
      <input type="submit" id="submit-new-game-button" name="start" value="Start New Game">`
    main_body_div.append(new_game_form)
  }


  static renderNewUser(game_id){
    let main_body_div = document.getElementsByClassName("container")[0]
    main_body_div.innerHTML = ''

    let new_user_form = document.createElement("form")
    new_user_form.className = 'new-user-form'
    new_user_form.innerHTML =
    `<p>Please enter your name to begin!</p>
    <input type="hidden" name="game_id" value=${game_id}>
    <input type="text" name="user" placeholder="Name"><br>
    <input type="submit" id="submit-new-user-button" value="Submit Name">`

    main_body_div.append(new_user_form)
  }




  static gameLobby(game_id){

    let current_game = gameStore.filter(game => game.id === parseInt(game_id))[0]
    let users = userStore.filter(user => user.game_id === parseInt(game_id))
    // need to find a way to calculate number of players in the game

    let main_body_div = document.getElementsByClassName("container")[0]
    main_body_div.innerHTML = ''

    let game_view = document.createElement("div")
    game_view.className = "game-lobby"
    game_view.innerHTML =
    `<h3>${current_game.title}</h3>
    <p>Number of Players: ${users.length} / ${current_game.num_of_players}</p>
    <ul id="users-list">
    </ul>`
    main_body_div.append(game_view)
    let userslist = document.getElementById("users-list")
      users.forEach(function(user){
        let userLI = document.createElement("li")
        userLI.innerHTML = `${user.name}`
        userslist.append(userLI)
      })


    game_view.append(userslist)

  }


  static renderExistingGames(){
    console.log("im in render existing games")

    // Game.checkGamesStatus();


    let pendingGames = gameStore.filter(game => game.status === "pending")

    let main_body_div = document.getElementsByClassName("container")[0]
    main_body_div.innerHTML = ''

    let pendingGamesDiv = document.createElement("div")
    pendingGamesDiv.className = "pending-games"
    pendingGamesDiv.innerHTML = `<h3>Pending Games: Select One To Join</h3>`

    pendingGames.forEach(function(game){
      let gameP = document.createElement("p")
      console.log(game)
      gameP.innerHTML = `${game.title}: ${game.num_of_players - game.getUsers().length} spot(s) available`


      let joinButton = document.createElement("button")
      joinButton.className = "join-game-id-button"
      joinButton.dataset.id = game.id
      joinButton.innerHTML = `Join`
      gameP.append(joinButton)
      pendingGamesDiv.append(gameP)
    })

    main_body_div.append(pendingGamesDiv)
  }

  static handleTurn(game_id){

    // need our conditional regarding turns and which sentence / canvas

  }

  static renderSentence(game_id){
    let game = gameStore.filter(game => game.id === game_id)
    let main_body_div = document.getElementsByClassName("container")[0]
    main_body_div.innerHTML = ''

    let game_view = document.createElement("div")
    game_view.className = "game-view"

    game_view.innerHTML = `<h3> ${game.title} </h3>
    <h4>Round ${game.turns}</h4>`

    let sentence_form = document.createElement("form")
    sentence_form.innerHTML =
    `<input type="hidden" name="game_id" value=${game_id}>
    <input type="text" name="sentence" placeholder="Type Your Sentence"><br>
    <input type="submit" id="submit-sentence-button" value="Submit Sentence">
    `
    game_view.append(sentence_form)
    main_body_div.append(game_view)
  }

  static submitSentence(game_id){}

  static renderCanvas(game_id){}

  static submitCanvas(game_id){}






}
