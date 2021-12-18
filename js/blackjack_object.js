// pcm 20172018a Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;


// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        this.deck=[];

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false,
            'dealerBusted' : false,
            'playerWon' : false,
            'tie' : false,
            'dealerBlackjack' : false
        };

        

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
           
          // naipes
            for (let i = 0; i < 4; i++){
              // cartas 
              for (let j = 1; j <= 13; j++){
                  // j - cartas + i - naipes em decimal
                  let card = j + i / 10; 
                  this.deck.push(card);
              }
          }
          
        };



        this.shuffle = function (deck) {
           

            
            let temporario;
            // percorre o array até ao ultimo índice
            for (let i = 0; i < deck.length; i++){
                //random indice
                let i2 = Math.floor(Math.random() * deck.length);
                // troca as cartas
                temporario = deck[i];
                deck[i] = deck[i2]
                deck[i2] = temporario;
            }
        };

        // baralho de cartas baralhado
        this.new_deck();
        this.shuffle(this.deck);
    }

    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn (val) {
        this.dealerTurn = true;
    }



   
 
    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {
         let score = 0;
       
        
         for (let i = 0; i < cards.length; i++){
            let cardVal = Math.floor(cards[i]);
            if(cardVal <= 10 && cardVal >= 2){
                score += cardVal;
            }

              else if (cardVal >= 11 && cardVal <= 13){
                score += 10;
            }

             else if (cardVal == 1 && score < 11){
                 score += 11;
             } else if (cardVal == 1 && score >=11){
               score += 1;
             }
        } 
        
        
        return score; 
        //}
    }


    dealer_move() {
        
        this.dealer_cards.push(this.deck[0]);
        this.deck.shift();
        
        return this.get_game_state(); 
    }

    player_move() {
         this.player_cards.push(this.deck[0]);
         this.deck.shift();

         return this.get_game_state(); 

    }

    get_game_state() {
       

        let pontosJogador = this.get_cards_value(this.player_cards);
        let pontosDealer = this.get_cards_value(this.dealer_cards);

        let jogadorBusted = this.dealerTurn == false && pontosJogador > MAX_POINTS || this.dealerTurn == true && pontosJogador == pontosDealer;
        let dealerIsBusted = this.dealerTurn == true && pontosDealer > MAX_POINTS;

        let jogadorGanha = dealerIsBusted || this.dealerTurn == false && pontosJogador == MAX_POINTS 
                  || pontosJogador <= MAX_POINTS && this.dealerTurn == true && pontosJogador > pontosDealer ||
                    pontosJogador <= MAX_POINTS && this.dealerTurn == true && pontosJogador > pontosDealer ||
                    pontosJogador == MAX_POINTS;
                                                                                                      
        let dealerGanha = jogadorBusted || this.dealerTurn == true && (pontosDealer == MAX_POINTS || this.dealerTurn == true &&
                                                                    pontosDealer > 17 && pontosDealer > pontosJogador && pontosDealer < MAX_POINTS) 
                                                                    || this.dealerTurn == true && pontosDealer < MAX_POINTS && pontosDealer > pontosJogador;
        let blackDealer = this.dealerTurn == true && pontosDealer == 21;
        

        
        this.state.gameEnded = jogadorGanha || dealerGanha;
        this.state.playerWon = jogadorGanha;
        this.state.dealerBusted = dealerIsBusted;
        this.state.dealerWon = dealerGanha;
        this.state.playerBusted = jogadorBusted;
        this.state.dealerBlackjack = blackDealer;

        return this.state;    
    }
}

