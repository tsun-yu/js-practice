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

const slr = (name) => document.querySelector(name);

let cardsPool = [];
let cardsPlayer = [];
let flag = 0;
let total = 0;

//產生一副牌
const initCards = () => {
  const suit = ["c", "s", "h", "d"];
  const point = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  for (i = 0; i < suit.length; i++) {
    for (j = 0; j < point.length; j++) {
      cardsPool.push(createCard(suit[i], point[j]));
    }
  }
};

//洗牌
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

//發牌
const dispatch = () => {
  displayCard(cardsPool[flag]);
  cardsPlayer.push(cardsPool[flag]);
  let totalTmp = 0;
  cardsPool[flag].point > 10 && (cardsPool[flag].point = 10);

  // cardsPlayer.map((v) => {
  //   totalTmp < 21 && v.point == 1 && (v.point = 11);
  //   totalTmp += v.point;
  // });

  total += cardsPool[flag].point;
  console.log("totalTmp", totalTmp);
  console.log("total", total);
  slr("#total").innerHTML = total;
  flag++;
};

// const card = createCard("c", 11);
// createCard(v.suit, v.point));
// const card = new Card("h", 13);

initCards();
cardsPool = [...shuffle(cardsPool)];

const displayCard = (card) => {
  slr("#cards").appendChild(card.toString());
};

slr("#dispatch").addEventListener("click", () => dispatch());
