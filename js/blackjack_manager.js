// pcm 20172018a Blackjack oop

let game = null;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization(){
    document.getElementById("card").disabled     = false;
    document.getElementById("stand").disabled     = false;
    document.getElementById("new_game").disabled = false;
}

function finalize_buttons(){
    document.getElementById("card").disabled     = true;
    document.getElementById("stand").disabled     = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
function new_game(){

    
    game = new BlackJack();
    //debug(game);

    

    //player_new_card();
    //player_new_card();
    player_new_card();
    dealer_new_card();
    dealer_new_card();
    console.log(game.get_cards_value(game.get_dealer_cards()));
    
    
    
    //Apresenta os pontos atuais de inicio de jogo
    document.getElementById("ptsnmr").innerHTML = game.get_cards_value(game.get_player_cards());

    let dealerCount = game.get_dealer_cards();
    if(Math.floor(dealerCount[0]) == 11 ||(Math.floor(dealerCount[0]) == 12 || (Math.floor(dealerCount[0]) == 13 ))){
        document.getElementById("ptsnmrd").innerHTML = "10";
    }else if(Math.floor(dealerCount[0]) == 1){
        document.getElementById("ptsnmrd").innerHTML =  "11";
    }
    else{
        document.getElementById("ptsnmrd").innerHTML =  Math.floor(dealerCount[0]);
    }
    

    //document.getElementById("ptsnmrd").innerHTML = game.get_cards_value(game.get_dealer_cards()[0]);
    //Cria duas variaveis dos botoes que irão executar funções .onclick
    var card = document.getElementById("card");
    var stand = document.getElementById("stand");
     
    //Irá dar clear ao ecra assim que começar o jogo
    let idPlayer = document.getElementById("playerStatus");
    let idDealer = document.getElementById("dealerStatus");
    let playercards = document.getElementById("playerCards");
    let dealerCards = document.getElementById("dealerCards");

    empty(idPlayer);
    empty(idDealer);
    
    empty(playercards);
    empty(dealerCards);

    deckDesenhado("player", game.get_player_cards());
    cartasDesenhadas("dealer", game.get_dealer_cards()[0]) ;

    let cartaDealer = document.createElement("img");
    cartaDealer.src = "images/Inkedred_joker.png";
    
    //cartasDesenhadas("dealer", cartaDealer[0]);
    document.getElementById("dealerCards").appendChild(cartaDealer);

    buttons_initialization();    
}

// METODO QUE LIMPA O JOGO ANTERIOR;
function empty(element) {
    element.innerHTML = "";
}


function update_dealer(state){
    //document.getElementById("dealer").innerHTML = JSON.stringify(game.get_dealer_cards());
    empty(document.getElementById("dealerCards"));
    

    document.getElementById("ptsnmrd").innerHTML = game.get_cards_value(game.get_dealer_cards());
    
    
      if(state.gameEnded == true){
        game.get_dealer_cards();
        deckDesenhado("dealer", game.get_dealer_cards());
         /*  if(state.dealerWon === false){
            document.getElementById("dealerStatus").innerHTML = "O dealer perdeu!";
         } else if(state.playerWon === true){
            document.getElementById("dealerStatus").innerHTML = "O dealer perdeu!";
         } else if (state.playerWon === false){
            document.getElementById("dealerStatus").innerHTML = "O dealer ganhou!";
         } else if (state.dealerBusted === true && state.playerBusted === true){
            document.getElementById("dealerStatus").innerHTML = "O dealer ganhou!";
        } else if (state.tie === true){
            document.getElementById("dealerStatus").innerHTML = "O dealer ganhou!";
        } */

            if(state.dealerWon === true){
                document.getElementById("playerStatus").innerHTML = "O jogador perdeu...";
            } else {
                document.getElementById("playerStatus").innerHTML = "O jogador ganhou!";
            }
        
    }
    
 
       
    
        
     

    finalize_buttons();
}


function update_player(state){
    empty(document.getElementById("playerCards"));
    empty(document.getElementById("dealerCards"));
    deckDesenhado("dealer", game.get_dealer_cards());
    game.get_player_cards();
    //document.getElementById("player").innerHTML = JSON.stringify(game.get_player_cards()); 

   deckDesenhado("player", game.get_player_cards());

   document.getElementById("ptsnmr").innerHTML = game.get_cards_value(game.get_player_cards());
   document.getElementById("ptsnmrd").innerHTML = game.get_cards_value(game.get_dealer_cards());
    
    
    if (state.gameEnded === true){
        if(state.playerWon == true){
            document.getElementById("playerStatus").innerHTML = "O jogador ganhou!";
        } else {
            document.getElementById("playerStatus").innerHTML = "O jogador perdeu...";
        }
        finalize_buttons();
    }
    

    
}



function cartasDesenhadas(jogador, carta){
    let drawCard = document.createElement("img");
    if (card == "X"){
        drawCard.src = "images/Inkedred_joker.png"
    } else {
        drawCard.src ="images/" + carta + ".png";
    }
    drawCard.src = "images/" + carta + ".png";
    let jogadorcriado = document.getElementById(jogador + "Cards");
    jogadorcriado.appendChild(drawCard);
}

function deckDesenhado(jogador, carta){
    document.getElementById(jogador + "Cards").innerHTML = "";
    for(let i = 0; i < carta.length; i++){
        cartasDesenhadas(jogador, carta[i]);
    }
}

function dealer_new_card(){
    
    update_dealer(game.dealer_move());
    return game.state;
}

function player_new_card(){
    
    
    update_player(game.player_move());
    if(game.get_cards_value(game.get_dealer_cards()) <= 16 && game.get_dealer_cards() <= 2){
        //dealer_new_card();
    }   

    
    
    
    
    return game.state;
}

function dealer_finish(){
    game.get_game_state();
    game.dealerTurn = true;

     if(game.get_cards_value(game.get_dealer_cards()) > game.get_cards_value(game.get_player_cards())){
        game.state.gameEnded == true;
        deckDesenhado("dealer", game.get_dealer_cards());
    }
     else if(game.get_cards_value(game.get_dealer_cards()) == game.MAX_POINTS){
        game.state.gameEnded == true;
    }
     
    while(game.state.gameEnded == false){
        /* if(game.get_cards_value(game.get_dealer_cards()) > game.get_cards_value(game.get_player_cards())){
            game.state.gameEnded == true;
        } */
            update_dealer(game.get_game_state());
        //dealer_new_card();
        //game.state = game.get_game_state();     
        }

    
    }

