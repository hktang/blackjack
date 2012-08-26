// Card Constructor
function Card(s, n){
	var suit = s;
	var number = n;
	this.getSuit = function () {
		var names = ['♢', '♧', '♡', '♤'];
		var suitName = names[suit];
		return suitName;
	};
	this.getNumber = function () {return number;};
	this.numberName = function (){
		theNumber = this.getNumber();
		var names = ["A", '2', '3', '4', '5', '6', '7', '8', '9', '10', "J", "Q", "K"];
		numberName = names[theNumber];
		return numberName;
	};
	this.getValue = function () {
		var value = 0;
		theNumber = this.getNumber();
		if (theNumber === 0) { 
			value = 11;
		}else if (theNumber > 9){
			value = 10;
		}else {value = theNumber+1;}
		return value;
	};
}

//Make Deck
var makeDeck = function (){
	var cards = Array(4);
	for (var i = 0; i < 4; i++) {
		cards[i] = new Array(3);
		for (var j = 0; j < 13; j++) {
			cards[i][j] = new Card(i,j);
		}
	}
	return cards;
};

//deal a card from a deck
var deal = function(deck){
	var s = Math.floor(Math.random()*4);
	var n = Math.floor(Math.random()*13);
	//make sure not to deal a non-existent card
	while (deck[s][n] === 0){
		s = Math.floor(Math.random()*4);
		n = Math.floor(Math.random()*13);
	}
	card = deck[s][n];
	//'remove' card from deck
	deck[s][n] = 0;
	return [card, deck];
};

//Hand (a set of cards belonging to a player)
function Hand (deck){
	var currentDeck = deck;
	var cards = [];
	for (var i=0; i<2; i++){
		var card = deal(currentDeck)[0];
		cards.push(card);
	}
    
    //get what's in Hand
	this.getHand = function () {return cards;};
 
    //print out loud
	this.printHand = function() {
		msg = '| ';
		for (var i in cards){
			msg += cards[i].getSuit() + cards[i].numberName() + " | ";
		}
		return msg;
	};
  
    //get total score
	this.score = function(){
		var cards = this.getHand();
		var totalScore = 0;
		var aceCount = 0;
		for (var i in cards){
			totalScore += cards[i].getValue();
			if (cards[i].getValue() === 11){
				aceCount += 1;
			}
		}
		while (totalScore > 21 && aceCount !== 0){
			totalScore -= 10;
			aceCount --;
		}
		return totalScore;
	};
  
    //deal one more card
	this.hitMe = function(currentDeck){
		newCard = deal (currentDeck)[0];
		cards.push(newCard);
	};
  
    //count remaining card (helper)
	this.cardsRemaining = function(){
		var c = 0;
		for (var i in currentDeck){
			for(var j in currentDeck[i]){
				if (currentDeck[i][j]!==0){
					c ++;
				}
			}
		}
		return c;
	};
}

//Dealer will stand when score reaches 17, otherwise keep hitting.
var playAsDealer = function(deck) {
	var hand = new Hand(deck);
	while (hand.score()<17){
		hand.hitMe(deck);
	}
	return hand;
};

//User interaction throuth dialogue box.
var playAsUser = function (deck){
	var hand = new Hand(deck);
  while (confirm("You got: " + hand.printHand() + "\n Hit or Stand? Select OK if you wnat one more card.")){
		hand.hitMe(deck);
	}
	return hand;
};

//Declare winner by comparing total score. Whoever getting 5 cards without bursting wins the game.
var declareWinner = function(userHand, dealerHand){
	var a = userHand.score();
    var b = dealerHand.score();
    if (a>21){
          if(b>21){
              return "You tied!";
          }else{
              return "You lose!";	
          }
      }else if (b>21){
          return "You win!";
      }else if (a > b){
          return "You win!";
      }else if (a === b){
          return "You tied!";
      }else {return "You lose!";}
};

var playGame = function (){
	var gameDeck = makeDeck();
	var userHand = playAsUser(gameDeck);
	var dealerHand = playAsDealer(gameDeck);
	console.log("--------Dealer (" +dealerHand.score()+ ") --------\n" + dealerHand.printHand()) ;
	console.log("-------- You (" +userHand.score()+ ") -----------\n" + userHand.printHand()) ;
	console.log(declareWinner(userHand, dealerHand));
};