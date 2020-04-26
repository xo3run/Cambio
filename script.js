class Deck {
    constructor() {
        this.deckOfCards = [{ symb: 0x41, value: 1, name: "Ace", suit: "diamonds" },
            { symb: 0x42, value: 2, name: "2", suit: "diamonds" },
            { symb: 0x43, value: 3, name: "3", suit: "diamonds" },
            { symb: 0x44, value: 4, name: "4", suit: "diamonds" },
            { symb: 0x45, value: 5, name: "5", suit: "diamonds" },
            { symb: 0x46, value: 6, name: "6", suit: "diamonds" },
            { symb: 0x47, value: 7, name: "7", suit: "diamonds" },
            { symb: 0x48, value: 8, name: "8", suit: "diamonds" },
            { symb: 0x49, value: 9, name: "9", suit: "diamonds" },
            { symb: 0x4A, value: 10, name: "10", suit: "diamonds" },
            { symb: 0x4B, value: 10, name: "Jack", suit: "diamonds" },
            { symb: 0x4C, value: 10, name: "Queen", suit: "diamonds" },
            { symb: 0x4D, value: 0, name: "King", suit: "diamonds" },
        ];
        var suits = [{ off: 0x04E - 0x41, suit: "hearts" },
            { off: 0x061 - 0x41, suit: "spades" },
            { off: 0x6E - 0x41, suit: "clubs" }
        ];
        suits.forEach(suit => {
            for (var i = 0; i < 13; i++) {
                var crd = this.deckOfCards[i];
                this.deckOfCards.push({ symb: crd.symb + suit.off, value: crd.val, name: crd.name, suit: suit.suit });
            }
        });
        for (var i = 0; i < 2; i++) {
            this.deckOfCards.push({ symb: 0x3F, value: -5, name: "Jocker", suit: "nosuit" });
        }
        this.shuffle(this.deckOfCards);
        this.currentCardIdx = 0;
    }
    shuffle(array) {
        var i = 0,
            j = 0,
            temp = null
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    dealACard() {
        var card = this.deckOfCards[this.currentCardIdx];
        this.currentCardIdx++;
        if (this.currentCardIdx === this.deckOfCards.length) {
            this.currentCardIdx = 0;
            this.shuffle(this.deckOfCards);
        }
        return card;
    }
}

class Cambio {
    constructor() {
        this.deckOfCards = new Deck();
    }
    setCardState(card, isVisible) {
        if (isVisible) {
            card.classList.add('visible');
        } else {
            card.classList.remove('visible');
        }
        card.isUp = isVisible;
    }
    flipCard(card) {
        this.setCardState(card, !card.isUp);
    }
}

function ready() {
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new Cambio(cards);

    cards.forEach(cardWidget => {
        cardWidget.isUp = false;
        cardWidget.card = game.deckOfCards.dealACard();
        game.setCardState(cardWidget, false);
        cardWidget.addEventListener('click', () => {
            game.flipCard(cardWidget);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}