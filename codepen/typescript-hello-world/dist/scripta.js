"use strict";
let cards = [];
for (let i = 0; i < 7; i++) {
    let card = [];
    card[0] = i % 3;
    card[1] = i % 9;
    card[2] = Math.floor(i / 3);
    console.log(JSON.stringify(card));
}