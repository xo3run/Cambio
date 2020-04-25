class Cambio {
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

    cards.forEach(card => {
        card.isUp = false;
        game.setCardState(card, false);
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}