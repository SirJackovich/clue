var game = {
  deck: [],
  people: [
    {
      name: "Colonel Mustard",
      type: "person"
    },
    {
      name: "Miss Scarlett",
      type: "person"
    },
    {
      name: "Mr Green",
      type: "person"
    },
    {
      name: "Mrs Peacock",
      type: "person"
    },
    {
      name: "Mrs White",
      type: "person"
    },
    {
      name: "Professor Plum",
      type: "person"
    }
  ],
  players: [],
  rooms: [
    {
      name: "Ballroom",
      type: "room"
    },
    {
      name: "Billiard Room",
      type: "room"
    },
    {
      name: "Conservatory",
      type: "room"
    },
    {
      name: "Dining Room",
      type: "room"
    },
    {
      name: "Hall",
      type: "room"
    },
    {
      name: "Kitchen",
      type: "room"
    },
    {
      name: "Library",
      type: "room"
    },
    {
      name: "Lounge",
      type: "room"
    },
    {
      name: "Study",
      type: "room"
    }
  ],
  solution: {
    room: {},
    person: {},
    weapon: {}
  },
  weapons: [
    {
      name: "Candlestick",
      type: "weapon"
    },
    {
      name: "Knife",
      type: "weapon"
    },
    {
      name: "Lead Pipe",
      type: "weapon"
    },
    {
      name: "Revolver",
      type: "weapon"
    },
    {
      name: "Rope",
      type: "weapon"
    },
    {
      name: "Wrench",
      type: "weapon"
    }
  ]
};

var numberOfPlayers = prompt("Number of players");
initGame(numberOfPlayers);
console.log("Game: ", game);

function initGame(numberOfPlayers){
  var people = game.people.slice(0, game.people.length);
  var rooms = game.rooms.slice(0, game.rooms.length);
  var weapons = game.weapons.slice(0, game.weapons.length);

  // set up the solution
  game.solution.person = getCard(people);
  game.solution.room = getCard(rooms);
  game.solution.weapon = getCard(weapons);

  // initialize deck
  while(people.length || rooms.length || weapons.length){
    var type = Math.floor(Math.random() * (3));
    if(type === 0 && people.length) {
      game.deck.push(getCard(people));
    }else if(type === 1 && rooms.length) {
      game.deck.push(getCard(rooms));
    }else if(type === 2 && weapons.length) {
      game.deck.push(getCard(weapons));
    }
  }

  // initialize players
  for(var i = 0; i < numberOfPlayers; i++){
    var player = {
      people: [],
      rooms: [],
      weapons: []
    };
    for(var p = 0; p < game.people.length; p++){
      var person = game.people[p];
      player.people.push({name: person.name, type: person.type});
    }
    for(var r = 0; r < game.rooms.length; r++){
      var room = game.rooms[r];
      player.rooms.push({name: room.name, type: room.type});
    }
    for(var w = 0; w < game.weapons.length; w++){
      var weapon = game.weapons[w];
      player.weapons.push({name: weapon.name, type: weapon.type});
    }
    game.players.push(player);
  }

  // set up players hands
  while (game.deck.length){
    for(var i = 0; i < game.players.length; i++){
      var card = getCard(game.deck);
      if(card){
        setPlayer(i, card);
      } else {
        break;
      }
    }
  }
}

function getCard(deck) {
  return deck.length ? deck.splice(Math.floor(Math.random() * (deck.length)),1)[0] : null;
}

function setPlayer(index, card) {
  var player = game.players[index];
  if(card.type === "person"){
    setPlayerCard(player.people, card.name, index);
  }else if(card.type === "room"){
    setPlayerCard(player.rooms, card.name, index);
  }else if (card.type === "weapon"){
    setPlayerCard(player.weapons, card.name, index);
  }
}

function setPlayerCard(deck, name, index) {
  for(var i = 0; i < deck.length; i++){
    var card = deck[i];
    if(card.name === name){
      card.player = index;
    }
  }
}