require('dotenv').config();

const db = require('./db.js');
db.authenticate().catch(error => console.error(error));

(async () => {
    const Cards = require('./models/cards.model.js')
    await Cards.sync();

    await Cards.truncate();

    let data = [{
        "id": 1, "name": "The Fool"
    }, {
        "id": 2, "name": "The Magician"
    }, {
        "id": 3, "name": "The High Priestess"
    }, {
        "id": 4, "name": "The Empress"
    }, {
        "id": 5, "name": "The Emperor"
    }, {
        "id": 6, "name": "The Hierophant"
    }, {
        "id": 7, "name": "The Lovers"
    }, {
        "id": 8, "name": "The Chariot"
    }, {
        "id": 9, "name": "Strength"
    }, {
        "id": 10, "name": "The Hermit"
    }, {
        "id": 11, "name": "Wheel of Fortune"
    }, {
        "id": 12, "name": "Justice"
    }, {
        "id": 13, "name": "The Hanged Man"
    }, {
        "id": 14, "name": "Death"
    }, {
        "id": 15, "name": "Temperance"
    }, {
        "id": 16, "name": "The Devil"
    }, {
        "id": 17, "name": "The Tower"
    }, {
        "id": 18, "name": "The Star"
    }, {
        "id": 19, "name": "The Moon"
    }, {
        "id": 20, "name": "The Sun"
    }, {
        "id": 21, "name": "Judgment"
    }, {
        "id": 22, "name": "The World"
    }, {
        "id": 23, "name": "Ace of Wands"
    }, {
        "id": 24, "name": "Two of Wands"
    }, {
        "id": 25, "name": "Three of Wands"
    }, {
        "id": 26, "name": "Four of Wands"
    }, {
        "id": 27, "name": "Five of Cups"
    }, {
        "id": 28, "name": "Six of Cups"
    }, {
        "id": 29, "name": "Seven of Cups"
    }, {
        "id": 30, "name": "Eight of Cups"
    }, {
        "id": 31, "name": "Nine of Swords"
    }, {
        "id": 32, "name": "Ten of Swords"
    }, {
        "id": 33, "name": "Page of Swords"
    }, {
        "id": 34, "name": "Knight of Pentacles"
    }, {
        "id": 35, "name": "Queen of Pentacles"
    }, {
        "id": 36, "name": "King of Pentacles"
    }]

    for (const item of data) {
        await Cards.create({
            name: item.name
        });
    }

    console.log('cards filled');
})();
