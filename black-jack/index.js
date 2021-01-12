class Card {
  constructor(suit, point) {
    this.suit = suit;
    this.point = point;
  }
  toString() {
    let display = "";
    switch (this.point) {
      case 1:
        display = "A";
        break;
      case 11:
        display = "J";
        break;
      case 12:
        display = "Q";
        break;
      case 13:
        display = "K";
        break;
      default:
        display = this.point;
    }
    return Poker.getCardImage(60, this.suit, display);
  }
}

const createCard = (suit, point) => {
  return {
    suit,
    point,
    toString: function () {
      let display = "";
      switch (this.point) {
        case 1:
          display = "A";
          break;
        case 11:
          display = "J";
          break;
        case 12:
          display = "Q";
          break;
        case 13:
          display = "K";
          break;
        default:
          display = this.point;
      }
      return Poker.getCardImage(60, this.suit, display);
    },
  };
};

const cards = [];

const initCards = () => {
  const suit = ["c", "s", "h", "d"];
  const point = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  for (i = 0; i < suit.length; i++) {
    for (j = 0; j < point.length; j++) {
      cards.push(createCard(suit[i], point[j]));
    }
  }
};

//♣️♠️♥️♦️
// const card = createCard("c", 11);
cards.forEach((v) => {
  console.log(v.suit);
});

// console.log("v.suit",v.suit)
// console.log("v.point",v.point)
// }

// createCard(v.suit, v.point));
// const card = new Card("h", 13);

initCards();

cards.forEach((v) => {
  document.querySelector("#cards").appendChild(v.toString());
  console.log(v);
});


