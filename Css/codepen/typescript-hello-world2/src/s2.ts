let cards2 = [];

for (let i = 0; i < 7; i++) {
  let card2 = [];
  card2[0] = i % 3;
  card2[1] = i % 9;
  card2[2] = Math.floor(i / 3);
  console.log(JSON.stringify(card2));
}
