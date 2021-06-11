class Stone {
  constructor(color, num) {
    this.color = color;
    this.num = num;
  };
};

class Okey {
  constructor(player1, player2, player3, player4) {
    this.players = [player1, player2, player3, player4];
    this.current_player = 1;
    this.current_index = this.current_player - 1;
    this.current_rack = this.players[this.current_index].rack;
    this.current_name = this.players[this.current_index].name;
    this.max_point = 20;
    this.round = 1;
  };

  playersInfo() {
    console.log(this.players);
  };

  deckShuffle() {
    this.remaining_deck.sort(() => Math.random() - 0.5);
  };

  deckMaker() {
    const colors = ["Red", "Black", "Blue", "Orange"];
    this.remaining_deck = new Array;
    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      for (let num = 1; num <= 13; num++) {
        const stone = new Stone(color, num);
        this.remaining_deck.push(stone);
        this.remaining_deck.push(stone); // Seconds
      };
    };
    this.deckShuffle();
  };

  setIndicatorTile() {
    this.indicator = this.remaining_deck[0];
    this.indicator.isIndicator = true;
  };

  setOkey() {
    for (let i = 0; i < this.remaining_deck.length; i++) {
      const stone = this.remaining_deck[i];
      if (stone.num === this.indicator.num + 1 && stone.color === this.indicator.color) {
        stone.isOkey = true;
        this.okey = stone;
      } else if (this.indicator.num === 13 && stone.color === this.indicator.color && stone.num === 1) {
        stone.isOkey = true;
        this.okey = stone;
      };
    };
  };

  addFakeOkey() {
    const fake = new Stone(this.okey.color, this.okey.num);
    fake.isFake = true;
    this.remaining_deck.push(fake);
    this.remaining_deck.push(fake);
  };

  givePlayerRack() {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (this.round === 1) {
        player.points = this.max_point;
      };
      player.rack = new Array;
      // 1 stone more for first player
      if (i === 0) {
        player.rack.push(this.remaining_deck.shift());
      };
      // 14 stones for each player
      for (let i = 0; i < 14; i++) {
        player.rack.push(this.remaining_deck.shift());
      };
    };
  };

  gameInfo() {
    console.log("Game is starting...");
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      console.log(player);
    };
    // console.log("Remaining Deck:", this.remaining_deck);
    console.log("Turn:", this.turn);
    console.log("Remaining:", this.remaining_deck.length);
    console.log(this.indicator);
    console.log("Okey:", this.okey);
  };

  startGame() {
    this.turn = 1;
    this.current_player = 1;
    this.deckMaker();
    this.setIndicatorTile();
    this.setOkey();
    this.addFakeOkey();
    this.deckShuffle(); // Second shuffle
    this.givePlayerRack();
    this.gameInfo();
  };

  takeFromMiddle() {
    const stone = this.remaining_deck.pop();
    this.current_rack.push(stone);
    if (stone.isFake) {
      console.log("Fake okey is taken from middle by", this.current_name);
    } else {
      console.log(stone.num, "of", stone.color, "is taken from middle by", this.current_name);
    };
  };

  discard(discarded) {
    // Validation
    for (let i = 0; i < this.current_rack.length; i++) {
      const stone = this.current_rack[i];
      if (stone.color === discarded.color && stone.num === discarded.num) {
        this.current_rack.splice(i, 1);
        if (stone.isFake) {
          console.log("Fake okey was sent by", this.current_name, "to", this.players[this.current_index + 1].name, ".");
        } else {
          console.log(stone.num, "of", stone.color, "was sent by", this.current_name, "to", this.players[this.current_index + 1].name, ".");
        }
        return {
          p: this.current_player,
          who: this.current_name,
          to: this.players[this.current_index + 1].name,
          discarded: stone
        };
      };
    };
  };

  nextPlayer() {
    this.current_player === 4 ? this.current_player === 1 : this.current_player += 1;
  };

  viewForP1() {};
  viewForP2() {};
  viewForP3() {};
  viewForP4() {};

  takeFromLeftPlayer() {};

  playerWin(player_index) {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player !== this.players[player_index]) {
        player.points -= 2; // Std ending
      };
    };
  };

  zeroPointCheck() {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.points <= 0) {
        this.round = 1; // to start new game
        return true;
      };
    };
  };

  nextGame() {
    this.playerWin(0); // Hard-coded
    if (this.zeroPointCheck()) { // Invoke this when some-one ends
      return console.log("Game-Over!");
    };
    this.round += 1;
    console.log("Next round is started!", "Round:", this.round);
    const new_player_list = new Array;
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i + 1];
      if (player) {
        new_player_list.push(player);
      } else {
        new_player_list.push(this.players[0]);
      };
    };
    this.players = new_player_list;
    this.startGame();
  };
};

let p1 = {
  name: 'hasan'
};
let p2 = {
  name: 'erkut'
};
let p3 = {
  name: 'nurcan'
};
let p4 = {
  name: 'efe'
};

const game1 = new Okey(p1, p2, p3, p4);
game1.startGame();
game1.nextGame();
game1.nextGame();
