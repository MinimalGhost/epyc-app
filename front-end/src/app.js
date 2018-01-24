class App {

  static init() {

    let pre_game_div = document.getElementById("pre-game")
    pre_game_div.addEventListener("click", App.handlePreGameEvents)

    let game_div = document.getElementById("game-div")
    game_div.addEventListener("click", App.handleGameEvents)
  }


  static handlePreGameEvents(event){
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


  static handleGameEvents(event){
    event.preventDefault();

    let main_body_div = document.getElementsByClassName("container")[0]
    if(event.target.id === "submit-sentence-button"){
      let game_div = document.getElementById("game-div")
      let card_id = main_body_div.dataset.card
      let user_id = main_body_div.dataset.user
      let input = document.getElementById("sentence-form").elements[2].value
      console.log(card_id, user_id, input)
      App.getTurnCompleted(input, user_id, card_id)
    }

  }





  static renderGameForm(){
    let pre_game_div = document.getElementById("pre-game")
    pre_game_div.innerHTML = ''

    let new_game_form = document.createElement("form")
    new_game_form.className = 'new-game-form'
    new_game_form.innerHTML =
    `<p>Please enter the following information to play!</p>
    <label for="title">Title of Game</label>
    <input type="text" name="title" placeholder="Game Title"><br>
    <label for="num_of_players">Number of Players</label>
      <input type="number" name="num_of_players" placeholder="Number of Players"><br>
      <input type="submit" id="submit-new-game-button" name="start" value="Start New Game">`
    pre_game_div.append(new_game_form)
  }


  static renderNewUser(game_id){
    let pre_game_div = document.getElementById("pre-game")
    pre_game_div.innerHTML = ''

    let new_user_form = document.createElement("form")
    new_user_form.className = 'new-user-form'
    new_user_form.innerHTML =
    `<p>Please enter your name to begin!</p>
    <input type="hidden" name="game_id" value=${game_id}>
    <input type="text" name="user" placeholder="Name"><br>
    <input type="submit" id="submit-new-user-button" value="Submit Name">`

    pre_game_div.append(new_user_form)
  }


  static renderExistingGames(){
    console.log("im in render existing games")

    let pendingGames = gameStore.filter(game => game.status === "pending")

    let pre_game_div = document.getElementById("pre-game")
    pre_game_div.innerHTML = ''

    let pendingGamesDiv = document.createElement("div")
    pendingGamesDiv.className = "pending-games"
    pendingGamesDiv.innerHTML = `<h3>Pending Games: Select One To Join</h3>`

    pendingGames.forEach(function(game){
      let gameP = document.createElement("p")
      gameP.innerHTML = `${game.title}: ${game.num_of_players - game.getUsers().length} spot(s) available`


      let joinButton = document.createElement("button")
      joinButton.className = "join-game-id-button"
      joinButton.dataset.id = game.id
      joinButton.innerHTML = `Join`
      gameP.append(joinButton)
      pendingGamesDiv.append(gameP)
    })

    pre_game_div.append(pendingGamesDiv)
  }

  static gameLobby(game_id, user_id){
    // let card_id = cardStore.filter( card => card.user_id == user_id)
    let main_body_div = document.getElementsByClassName("container")[0]
    main_body_div.dataset.game = game_id

    let pre_game_div = document.getElementById("pre-game")
    pre_game_div.innerHTML = ''
    let current_game = gameStore.filter(game => game.id === parseInt(game_id))[0]
    let users = userStore.filter(user => user.game_id === parseInt(game_id))
    // need to find a way to calculate number of players in the game

    let game_div = document.getElementById("game-div")
    main_body_div.dataset.user = user_id
    // game_div.dataset.card = card_id[0].id
    game_div.innerHTML = ''

    let game_view = document.createElement("div")
    game_view.className = "game-lobby"
    game_view.innerHTML =
    `<h3>${current_game.title}</h3>
    <p>Number of Players: ${users.length} / ${current_game.num_of_players}</p>`

    let userslist = document.createElement("ul")
    userslist.className = "users-list"
      users.forEach(function(user){
        let userLI = document.createElement("li")
        userLI.innerHTML = `${user.name}`
        userslist.append(userLI)
      })
    game_view.append(userslist)
    game_div.append(game_view)

  }


  // static handleTurn(game_id){
  //   setTimeout(function(){
  //     let game = gameStore.filter(game => game.id == game_id)[0]
  //     // FIRST SUBMIT THE FIRST ROUND OF THE Sentence
  //     // if all people submit a sentence
  //     // then submit, and increment the turn
  //     // ELSE IF THE TURN IS EVEN = RENDER CANVAS
  //     // THEN SUBMIT CANVAS AND increment the turn
  //   }, 5000);
  // }

    // need our conditional regarding turns and which sentence / canvas

  static renderSentenceForm(game_id){
    let game = gameStore.filter(game => game.id == game_id)[0]

    let main_body_div = document.getElementsByClassName("container")[0]
    let game_div = document.getElementById("game-div")
    game_div.innerHTML = ''

    let card_id = cardStore.filter( card => card.user_id == main_body_div.dataset.user )
    debugger
    main_body_div.dataset.card = card_id[0].id
    game_div.innerHTML = ''

    let game_view = document.createElement("div")
    game_view.className = "game-view"

    game_view.innerHTML = `<h3> ${game.title} </h3>
    <h4>Round ${game.turns}</h4>`

    let sentence_form = document.createElement("form")
    sentence_form.id = "sentence-form"
    sentence_form.innerHTML =
    `<input type="hidden" name="user_id" value=${main_body_div.dataset.user}>
    <input type="hidden" name="card_id" value=${main_body_div.dataset.card}>
    <input type="text" name="sentence" placeholder="Type Your Sentence"><br>
    <input type="submit" id="submit-sentence-button" value="Submit Sentence">
    `
    game_view.append(sentence_form)
    game_div.append(game_view)
  }

  static getTurnCompleted(input, user_id, card_id){
    let game_id = document.getElementsByClassName("container")[0].dataset.game
    let game_frontend = gameStore.filter(game => game.id === parseInt(game_id))[0]
    Adaptor.createEntry(input, user_id, card_id)

    setTimeout(function(){
      let game_entries = [].concat.apply([], game_frontend.cards.map(card => card.entries))

      Adaptor.updateGameState(game_id).then(resp =>{
        if(game_entries.length === game_frontend.users.length){
          console.log("this worked")
          console.log(game_entries)
        } else {
          console.log("we are in the else")
          console.log(game_entries)
          App.getTurnCompleted(input, user_id, card_id)
        }
      })
    }, 1000);
  }





}
