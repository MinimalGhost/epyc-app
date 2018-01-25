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
    let game_div = document.getElementById("game-div")
    let main_body_div = document.getElementsByClassName("container")[0]
    let card_id = main_body_div.dataset.card
    let user_id = main_body_div.dataset.user


    if(event.target.id === "submit-sentence-button"){
      let input = document.getElementById("sentence-form").elements[2].value
      console.log(card_id, user_id, input)
      Adaptor.createEntry(input, user_id, card_id)
      App.getTurnCompleted(input, user_id, card_id)

    } else if (event.target.id === "save-image-btn"){
      console.log("im in the save for an image")
        let input = save()
        console.log(input)
        Adaptor.createEntry(input, user_id, card_id)
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
    console.log("users: ", users, "userid: ", user_id)
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


  static handleTurn(game_id){
    console.log("YAY")
    // App.renderCanvasForm(game_id)

    let game = gameStore.filter(game => game.id == game_id)[0]
    console.log("game-turns", game.turns)
    console.log("users-length", game.users.length)

    if (game.turns === (game.users.length + 1)){
      // change the status of the game and render each users card
      App.renderGameComplete(game_id)
    } else if (game.turns % 2 === 0){
      // render canvas form
      App.renderCanvasForm(game_id)
    } else if (game.turns % 2 != 0){
      // render sentence form
      App.renderSentenceForm(game_id)
    }
  }

    // need our conditional regarding turns and which sentence / canvas

  static renderSentenceForm(game_id){
    let game = gameStore.filter(game => game.id == game_id)[0]

    let main_body_div = document.getElementsByClassName("container")[0]
    let game_div = document.getElementById("game-div")
    game_div.innerHTML = ''

    // can this code below happen in the game lobby?
    let card_id = cardStore.filter( card => card.user_id == main_body_div.dataset.user )

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

    setTimeout(function(){
      let game_entries = [].concat.apply([], game_frontend.cards.map(card => card.entries))


      Adaptor.updateGameState(game_id).then(resp =>{
        // this conditional will need to change based on the users*turn
        if(game_entries.length === game_frontend.users.length*game_frontend.turns){
          App.handleTurn(game_id);
        } else {
          Adaptor.updateGameState(game_id).then(resp =>{
            App.getTurnCompleted(input, user_id, card_id)
          })
        }
      })
    }, 1000);
  }


  static renderGameComplete(game_id){
    let game = gameStore.filter(game => game.id == game_id)[0]
    let main_body_div = document.getElementsByClassName("container")[0]
    let user = userStore.filter(user => user.id == main_body_div.dataset.user)[0]
    let card = game.cards.filter(card => card.id == user.id)[0]
    console.log(card)
    let game_div = document.getElementById("game-div")
    game_div.innerHTML = ''


    let completed_div = document.createElement("div")
    completed_div.innerHTML = `
    <h3>Game Over!</h3>
    <h4>Here's your card, ${user.name}. </h4>`

    let card_div = document.createElement("div")

    card.entries.forEach(entry => {
      let entry_div = document.createElement("p")
      entry_div.innerHTML = `${entry.input}`
      card_div.append(entry_div)
    })

    completed_div.append(card_div)
    game_div.append(completed_div)
  }

  static renderCanvasForm(game_id){
    let game = gameStore.filter(game => game.id == game_id)[0]

    let game_div = document.getElementById("game-div")
    game_div.innerHTML = ''

    let game_view = document.createElement("div")
    game_view.className = "game-view"

    game_view.innerHTML = `<h3> ${game.title} </h3>
    <h4>Round ${game.turns}</h4>`

    game_div.append(game_view)

    let canvas_div = document.createElement("canvas-div")
    canvas_div.innerHTML = `
    <canvas id="canvas_area" width="400" height="400"></canvas>
    <!-- color palette -->
      <div id="choose_color_text">Choose Color</div>
      <div id="green" onclick="color(this)"></div>
      <div id="blue" onclick="color(this)"></div>
      <div id="red" onclick="color(this)"></div>
      <div id="yellow" onclick="color(this)"></div>
      <div id="orange" onclick="color(this)"></div>
      <div id="black" onclick="color(this)"></div>
      <!-- eraser -->
      <div id="eraser_text">Eraser</div>
      <div id="white" onclick="color(this)"></div>

      <!-- location and button for displaying saved canvas -->
      <img id="save_target" />
      <input type="button" value="save" id="save-image-btn" size="30" onclick="save()">

      <!-- clear canvas button -->
      <input type="button" value="clear" id="clr" size="23" onclick="erase()">`

    game_div.append(canvas_div)
    init();

  }




}
